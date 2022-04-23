using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiServer.Constants
{
    public static class ModelConstants
    {
        /*Const*/
        // Common
        public static readonly int takeLength = 20;
        /*Enum*/
        // Room
        public enum RoomType { Private, Group }
        // Message 
        public enum MessageType { Text, Image, File }
    }
}
