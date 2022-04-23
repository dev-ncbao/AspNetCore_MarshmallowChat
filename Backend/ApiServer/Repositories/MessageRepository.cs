using ApiServer.Constants;
using ApiServer.CustomModels;
using ApiServer.Models;
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
            Message message = _context.Messages.Where(m => m.RoomId == roomId).OrderByDescending(m => m.TimeCreated).FirstOrDefault();
            MessageModel messageModel = new MessageModel()
            {
                UserId = message.UserId,
                RoomId = message.RoomId,
                MessageId = message.MessageId,
                Content = message.Content,
                TimeCreated = message.TimeCreated,
                Type = message.Type
            };
            return messageModel;
        }

        public static async Task<List<MessageModel>> SelectMessage(MarshmallowChatContext _context, int roomId, int length)
        {
            List<MessageModel> messages = _context.Messages.Where(m => m.RoomId == roomId)
                .OrderByDescending(m => m.TimeCreated)
                .Skip(length)
                .Take(ModelConstants.takeLength)
                .Select(m => new MessageModel()
                {
                    UserId = m.UserId,
                    RoomId = m.RoomId,
                    MessageId = m.MessageId,
                    Content = m.Content,
                    TimeCreated = m.TimeCreated,
                    Type = m.Type
                }).ToList();
            return messages;
        }
    }
}
