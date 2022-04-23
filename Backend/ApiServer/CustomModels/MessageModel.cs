using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ApiServer.Constants.ModelConstants;

namespace ApiServer.CustomModels
{
    public class MessageModel
    {
        public int MessageId { get; set; }
        public int RoomId { get; set; }
        public string Content { get; set; }
        public MessageType Type { get; set; }
        public DateTime TimeCreated { get; set; }
        public int? UserId { get; set; }
    }
}
