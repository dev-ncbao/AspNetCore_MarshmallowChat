using System;
using System.Collections.Generic;

#nullable disable

namespace ApiServer.Models
{
    public partial class Message
    {
        public int MessageId { get; set; }
        public int RoomId { get; set; }
        public string Content { get; set; }
        public string Type { get; set; }
        public DateTime TimeCreated { get; set; }
        public int? UserId { get; set; }

        public virtual Room Room { get; set; }
        public virtual User User { get; set; }
    }
}
