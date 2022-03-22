using ApiServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace ApiServer.Repositories
{
    public static class UserRepository
    {
        private static MarshmallowChatContext _context;
        private static void Configure()
        {
            _context = new MarshmallowChatContext();
        }
        private static void Dispose()
        {
            _context.Dispose();
        }

        public static async Task<User> Select(string username, string password)
        {
            Configure();
            User user = await _context.Users.Where(u => u.Username == username && u.Password == password).FirstOrDefaultAsync<User>();
            Dispose();
            return user;
        }

        public static async Task<User> Select(int id)
        {
            Configure();
            User user = await _context.Users.Where(u => u.UserId == id).FirstOrDefaultAsync<User>();
            Dispose();
            return user;
        }

        public static async Task<IEnumerable<User>> SelectAll()
        {
            Configure();
            IEnumerable<User> users = await _context.Users.ToListAsync<User>();
            Dispose();
            return users;
        }

        public static async Task<User> Insert(User user)
        {
            Configure();
            await _context.Users.AddAsync(user);
            int state = await _context.SaveChangesAsync();
            if (state == 1)
            {
                Dispose();
                return user;
            }
            else
            {
                Dispose();
                return null;
            }
        }

        public static async Task<bool> EmailWasExisted(string email)
        {
            Configure();
            User user = await _context.Users.Where(u => u.Email == email).FirstOrDefaultAsync<User>();
            Dispose();
            return user != null;
        }

        public static async Task<bool> UsernameWasExisted(string username)
        {
            Configure();
            User user = await _context.Users.Where(u => u.Username == username).FirstOrDefaultAsync<User>();
            Dispose();
            return user != null;
        }
    }
}
