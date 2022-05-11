using System;
using System.Collections.Generic;
using static ApiServer.Constants.ModelConstants;

#nullable disable

namespace ApiServer.Models
{
    public partial class Message
    {
        public int MessageId { get; set; }
        public int RoomId { get; set; }
        public string Content { get; set; }
        public MessageType Type { get; set; }
        public long DateCreated { get; set; }
        public int? UserId { get; set; }

        public virtual Room Room { get; set; }
        public virtual User User { get; set; }
    }
}
