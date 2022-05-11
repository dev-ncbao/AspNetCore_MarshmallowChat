using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static ApiServer.Constants.ModelConstants;

namespace ApiServer.CustomModels
{
    public class RoomModel
    {
        public int RoomId { get; set; }
        public RoomType Type { get; set; }
        public string Name { get; set; }
        public string Avatar { get; set; }
        public MessageModel LastMessage { get; set; }
        public List<UserModel> Members { get; set; }
    }
}
