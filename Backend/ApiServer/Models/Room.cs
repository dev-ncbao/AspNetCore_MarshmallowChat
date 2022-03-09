using System;
using System.Collections.Generic;

#nullable disable

namespace ApiServer.Models
{
    public partial class Room
    {
        public Room()
        {
            Messages = new HashSet<Message>();
            RoomMembers = new HashSet<RoomMember>();
        }

        public int RoomId { get; set; }
        public string Type { get; set; }

        public virtual RoomInfo RoomInfo { get; set; }
        public virtual ICollection<Message> Messages { get; set; }
        public virtual ICollection<RoomMember> RoomMembers { get; set; }
    }
}
