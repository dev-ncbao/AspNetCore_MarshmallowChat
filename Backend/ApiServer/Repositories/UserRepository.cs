using ApiServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using ApiServer.CustomModels;

namespace ApiServer.Repositories
{
    public static class UserRepository
    {
        public static async Task<UserModel> SelectShortInfoAsync(MarshmallowChatContext _context, int userId)
        {
            UserModel user = await _context.Users
                .Where(u => u.UserId == userId)
                .Select(u => new UserModel()
                {
                    UserId = u.UserId,
                    Username = u.Username,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Avatar = u.Avatar
                })
                .FirstOrDefaultAsync();
            return user;
        }

        /*public static async Task<string> SelectFullName(MarshmallowChatContext _context, int userId)
        {
            
        }*/

        public static async Task<User> SelectAsync(MarshmallowChatContext _context, string username, string password)
        {
            User user = await _context.Users.Where(u => u.Username == username && u.Password == password).FirstOrDefaultAsync<User>();
            return user;
        }

        public static async Task<User> SelectAsync(MarshmallowChatContext _context, int userId)
        {
            User user = await _context.Users.Where(u => u.UserId == userId).FirstOrDefaultAsync<User>();
            return user;
        }

        public static async Task<User> SelectAsync(MarshmallowChatContext _context, int userId, string secret)
        {
            User user = await _context.Users.Where(u => u.UserId == userId && u.Secret == secret).FirstOrDefaultAsync<User>();
            return user;
        }

        public static async Task<IEnumerable<User>> SelectAllAsync(MarshmallowChatContext _context)
        {
            IEnumerable<User> users = await _context.Users.ToListAsync<User>();
            return users;
        }

        public static async Task<User> InsertAsync(MarshmallowChatContext _context, User user)
        {
            EntityEntry entry = await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            if (entry.State == EntityState.Unchanged) return user;
            return null;
        }

        public static async Task<bool> EmailExistsAsync(MarshmallowChatContext _context, string email)
        {
            User user = await _context.Users.Where(u => u.Email == email).FirstOrDefaultAsync<User>();
            return user != null;
        }

        public static async Task<bool> UsernameExistsAsync(MarshmallowChatContext _context, string username)
        {
            User user = await _context.Users.Where(u => u.Username == username).FirstOrDefaultAsync<User>();
            return user != null;
        }

        public static async Task<bool> UserExistsAsync(MarshmallowChatContext _context, int userId)
        {
            User user = await _context.Users.Where(u => u.UserId == userId).FirstOrDefaultAsync();
            return user != null;
        }
    }
}
