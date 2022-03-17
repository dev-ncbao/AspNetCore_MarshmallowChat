using ApiServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiServer.Repositories
{
    public static class UserRepository
    {
        public static User Get(string username, string password)
        {
            List<User> users = new MarshmallowChatContext().Users.ToList();
            User user = (from u in users
                         where u.Username == username && u.Password == password
                         select u).FirstOrDefault();
            return user;
        }
    }
}
