using System;
using System.Collections.Generic;

#nullable disable

namespace ApiServer.Models
{
    public partial class RoomInfo
    {
        public int RoomId { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }

        public virtual Room Room { get; set; }
    }
}
