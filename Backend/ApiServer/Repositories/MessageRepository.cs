using ApiServer.Constants;
using ApiServer.CustomModels;
using ApiServer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiServer.Repositories
{
    public static class MessageRepository
    {
        public static MessageModel SelectLastMessage(MarshmallowChatContext _context, int roomId)
        {
            Message message = _context.Messages.Where(m => m.RoomId == roomId).OrderByDescending(m => m.DateCreated).FirstOrDefault();
            if (message == null) return null;
            MessageModel messageModel = new MessageModel()
            {
                UserId = message.UserId,
                RoomId = message.RoomId,
                MessageId = message.MessageId,
                Content = message.Content,
                DateCreated = message.DateCreated,
                Type = message.Type
            };
            return messageModel;
        }

        public static async Task<List<MessageModel>> SelectMessage(MarshmallowChatContext _context, int roomId, int length)
        {
            List<MessageModel> messages = _context.Messages.Where(m => m.RoomId == roomId)
                .OrderBy(m => m.DateCreated)
                .Skip(length)
                .Take(ModelConstants.takeLength)
                .Select(m => new MessageModel()
                {
                    UserId = m.UserId,
                    RoomId = m.RoomId,
                    //MessageId = m.MessageId,
                    Content = m.Content,
                    DateCreated = m.DateCreated,
                    Type = m.Type
                }).ToList();
            return messages;
        }

        public static async Task<Message> InsertAsync(MarshmallowChatContext _context, MessageModel message)
        {
            Message parseMessage = new Message()
            {
                Content = message.Content,
                Type = message.Type,
                RoomId = message.RoomId,
                UserId = message.UserId,
                DateCreated = message.DateCreated,
                MessageId = message.MessageId.Value
            };
            EntityEntry entry = await _context.Messages.AddAsync(parseMessage);
            await _context.SaveChangesAsync();
            if (entry.State == EntityState.Unchanged) return parseMessage;
            else return null;
        }

        public static async Task<bool> ExistsAsync(MarshmallowChatContext _context, MessageModel message)
        {
            Message mess = await _context.Messages.Where(m => m.RoomId == message.RoomId && m.MessageId == message.MessageId).FirstOrDefaultAsync();
            return mess != null;
        }
    }
}
