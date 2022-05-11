using ApiServer.CustomModels;
using ApiServer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ApiServer.Constants.ModelConstants;

namespace ApiServer.Repositories
{
    public static class RoomRepository
    {
        public static async Task<List<string>> SelectTopicAsync(MarshmallowChatContext _context, int userId)
        {
            List<string> topic = await _context.RoomMembers.Where(rm => rm.UserId == userId).Select(rm => $"MLC-Topic{rm.RoomId}").ToListAsync();
            return topic;
        }

        public static async Task<List<string>> SelectAllTopicAsync(MarshmallowChatContext _context)
        {
            List<string> topic = await _context.Rooms.Select(rm => $"MLC-Topic{rm.RoomId}").ToListAsync();
            return topic;
        }

        public static async Task<List<int>> SelectAsync(MarshmallowChatContext _context, int userId)
        {
            List<int> roomIds = await _context.RoomMembers.Where(rm => rm.UserId == userId).Select(rm => rm.RoomId).ToListAsync();
            return roomIds;
        }

        public static List<int> Select(MarshmallowChatContext _context, int userId)
        {
            List<int> roomIds = _context.RoomMembers.Where(rm => rm.UserId == userId).Select(rm => rm.RoomId).ToList();
            return roomIds;
        }

        public static async Task<List<int>> SelectPartAsync(MarshmallowChatContext _context, int userId, List<int> roomIds)
        {
            List<int> rooms = RoomsHaveMessage(_context, userId);
            rooms = rooms.Except(roomIds).ToList();
            List<MessageModel> lastMessages = new List<MessageModel>();
            foreach (int room in rooms)
            {
                lastMessages.Add(MessageRepository.SelectLastMessage(_context, room));
            }
            rooms = new List<int>();
            rooms = lastMessages.OrderByDescending(m => m.DateCreated).Select(m => m.RoomId).Take(takeLength).ToList();
            return rooms;
        }

        public static async Task<List<RoomModel>> SelectPartAsync(MarshmallowChatContext _context, int userId, List<RoomModel> roomsInfo)
        {
            List<int> roomIds = roomsInfo.Select(r => r.RoomId).ToList();
            List<int> rooms = RoomsHaveMessage(_context, userId);
            rooms = rooms.Except(roomIds).ToList();
            List<MessageModel> lastMessages = new List<MessageModel>();
            foreach (int room in rooms)
            {
                lastMessages.Add(MessageRepository.SelectLastMessage(_context, room));
            }
            rooms = new List<int>();
            rooms = lastMessages.OrderByDescending(m => m.DateCreated).Select(m => m.RoomId).Take(takeLength).ToList();
            List<RoomModel> roomsInfoNext = new List<RoomModel>();
            foreach (int room in rooms)
            {

                roomsInfoNext.Add(await SelectWithLastMessageAsync(_context, room, userId));
            }
            return roomsInfoNext;
        }

        public static async Task<int> SelectAsync(MarshmallowChatContext _context, int userId, int friendId)
        {
            List<int> roomIds = SelectListPrivate(_context, userId);
            List<int> friendRoomIds = SelectListPrivate(_context, friendId);
            int roomId = roomIds.Intersect(friendRoomIds).DefaultIfEmpty(-1).First();
            return roomId;
        }

        public static List<int> SelectListPrivate(MarshmallowChatContext _context, int userId) 
        {
            List<int> ids = _context.Rooms.Where(r => r.Type == (int)RoomType.Private)
                .Join(_context.RoomMembers, r => r.RoomId, rm => rm.RoomId, (r, rm) => new RoomMember() { RoomId = rm.RoomId, UserId = rm.UserId })
                .Where(rm => rm.UserId == userId)
                .Select(rm => rm.RoomId)
                .ToList();
            return ids;
        }

        public static int SelectType(MarshmallowChatContext _context, int roomId)
        {
            int roomType = _context.Rooms.Where(r => r.RoomId == roomId).Select(r => (int)r.Type).ToList().DefaultIfEmpty(-1).First();
            return roomType;
        }

        public static List<int> RoomsHaveMessage(MarshmallowChatContext _context, int userId)
        {
            List<int> userRooms = Select(_context, userId);
            List<int> messageRooms = _context.Messages.AsEnumerable().GroupBy(m => m.RoomId).Where(g => userRooms.Contains(g.Key)).Select(g => g.Key).ToList();
            return messageRooms;
        }

        public static async Task<RoomModel> SelectWithLastMessageAsync(MarshmallowChatContext _context, int roomId, int userId)
        {
            RoomModel roomModel = new RoomModel();
            RoomType roomType = (RoomType)SelectType(_context, roomId);
            roomModel.RoomId = roomId;
            roomModel.Type = roomType;
            roomModel.Members = RoomMemberRepository.SelectMemberExpectSelf(_context, roomId, userId);
            if(roomModel.Type == RoomType.Group)
            {
                RoomInfo roomInfo = RoomInfoRepository.Select(_context, roomId);
                roomModel.Avatar = roomInfo.Avatar;
                roomModel.Name = roomInfo.Name;
            }
            else
            {
                UserModel friend = RoomMemberRepository.SelectFriend(_context, roomId, userId);
                roomModel.Avatar = friend.Avatar;
                roomModel.Name = $"{friend.FirstName} {friend.LastName}";
            }
            roomModel.LastMessage = MessageRepository.SelectLastMessage(_context, roomId);
            return roomModel;
        }

        public static async Task<int> InsertAsync(MarshmallowChatContext _context, int userId, int friendId)
        {
            Room room = new Room();
            room.DateCreated = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            room.Type = (int)RoomType.Private;
            EntityEntry entry = await _context.Rooms.AddAsync(room);
            await _context.SaveChangesAsync();
            if (entry.State == EntityState.Unchanged)
            {
                RoomMember member1 = new RoomMember() { UserId = userId, RoomId = room.RoomId };
                RoomMember member2 = new RoomMember() { UserId = friendId, RoomId = room.RoomId };
                EntityEntry entryMember1 = await _context.RoomMembers.AddAsync(member1);
                EntityEntry entryMember2 = await _context.RoomMembers.AddAsync(member2);
                await _context.SaveChangesAsync();
                if (entryMember1.State == EntityState.Unchanged && entryMember2.State == EntityState.Unchanged)
                    return room.RoomId;
            }
            return -1;
        }

        public static async Task<bool> ExistsAsync(MarshmallowChatContext _context, int userId, int friendId)
        {
            List<int> roomIds = SelectListPrivate(_context, userId);
            List<int> friendRoomIds = SelectListPrivate(_context, friendId);
            int roomId = roomIds.Intersect(friendRoomIds).DefaultIfEmpty(-1).First();
            if (roomId != -1) return true;
            return false;
        }
    }
}

