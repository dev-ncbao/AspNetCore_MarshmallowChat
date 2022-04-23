using ApiServer.CustomModels;
using ApiServer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiServer.Repositories
{
    public static class RoomMemberRepository
    { 
        public static List<int> SelectExceptSeft(MarshmallowChatContext _context, int roomId, int userId)
        {
            List<int> userIds = _context.RoomMembers.Where(rm => rm.RoomId == roomId && rm.UserId != userId).Select(rm => rm.UserId).ToList();
            return userIds;
        }

        public static UserModel SelectFriend(MarshmallowChatContext _context, int roomId, int userId)
        {
            int friendId = _context.RoomMembers.Where(rm => rm.RoomId == roomId && rm.UserId != userId).Select(rm => rm.UserId).ToList().DefaultIfEmpty(-1).First();
            UserModel user = _context.Users.Where(u => u.UserId == friendId).Select(u => new UserModel()
            {
                UserId = u.UserId,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Avatar = u.Avatar,
                Username = u.Username
            }).FirstOrDefault();
            return user != null ? user : null;
        }

        public static async Task<bool> Exists(MarshmallowChatContext _context, int roomId, int userId)
        {
            RoomMember roomMember = await _context.RoomMembers.Where(rm => rm.RoomId == roomId && rm.UserId == userId).FirstOrDefaultAsync();
            return roomMember != null;
        }
    }
}
