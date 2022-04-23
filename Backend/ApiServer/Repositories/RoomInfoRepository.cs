using ApiServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiServer.Repositories
{
    public static class RoomInfoRepository
    {
        public static RoomInfo Select(MarshmallowChatContext _context, int roomId)
        {
            RoomInfo roomInfo = _context.RoomInfos.Where(rf => rf.RoomId == roomId).FirstOrDefault();
            return roomInfo;
        }
    }
}
