using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiServer.Models
{
    public class FriendInvitation
    {
        public DateTime DateCreated { get; set; }
        public int From { get; set; }
        public int To { get; set; }
        public virtual User FromUser { get; set; }
        public virtual User ToUser { get; set; }
    }
}
