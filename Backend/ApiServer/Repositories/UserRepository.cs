using ApiServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Microsoft.Extensions.DependencyInjection;

namespace ApiServer.Repositories
{
    public static class UserRepository
    {
        private static MarshmallowChatContext _context;

        private static void Configure() {
            _context = new MarshmallowChatContext();
        }

        private static void Dispose()
        {
            _context.Dispose();
        }
        
        public static async Task<User> Select(string username, string password)
        {
            Configure();
            //
            User user = await _context.Users.Where(u => u.Username == username && u.Password == password).FirstOrDefaultAsync<User>();
            //
            Dispose();
            return user;
        }

        public static async Task<User> Select(int id)
        {
            Configure();
            //
            User user = await _context.Users.Where(u => u.UserId == id).FirstOrDefaultAsync<User>();
            //
            Dispose();
            return user;
        }

        public static async Task<IEnumerable<User>> SelectAll()
        {
            Configure();
            //
            IEnumerable<User> users = await _context.Users.ToListAsync<User>();
            //
            Dispose();
            return users;
        }
    }
}
