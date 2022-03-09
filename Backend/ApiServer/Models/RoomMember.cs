using System;
using System.Collections.Generic;

#nullable disable

namespace ApiServer.Models
{
    public partial class RoomMember
    {
        public int UserId { get; set; }
        public int RoomId { get; set; }

        public virtual Room Room { get; set; }
        public virtual User User { get; set; }
    }
}
