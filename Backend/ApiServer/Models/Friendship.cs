using System;
using System.Collections.Generic;

#nullable disable

namespace ApiServer.Models
{
    public partial class Friendship
    {
        public int User1Id { get; set; }
        public int User2Id { get; set; }
        public long DateCreated { get; set; }

        public virtual User User1 { get; set; }
        public virtual User User2 { get; set; }
    }
}
