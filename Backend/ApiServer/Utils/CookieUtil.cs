using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiServer.Utils
{
    public static class CookieUtil
    {
        public static Dictionary<string, string> ToDictionary(string cookieString)
        {
            Dictionary<string, string> cookies = new Dictionary<string, string>();
            string[] arrCookie = cookieString.Split(';');
            foreach(string item in arrCookie)
            {

                string[] cookie = item.Trim().Split('=');
                cookies.Add(cookie[0], cookie[1]);
            }
            return cookies;
        }
    }
}
