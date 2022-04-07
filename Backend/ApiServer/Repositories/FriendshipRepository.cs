using ApiServer.Constants;
using ApiServer.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiServer.Repositories
{
    public static class FriendshipRepository
    {
        public static async Task<List<int>> SelectPartFindFriend(MarshmallowChatContext _context, int id, string name, int length)
        {
            List<int> ids = await _context.Friendships.Where(f1 => f1.User1Id == id)
                .Select(f1 => f1.User2Id)
                .Union(
                    _context.Friendships.Where(f2 => f2.User2Id == id)
                        .Select(f2 => f2.User1Id)
                )
                .Distinct()
                .OrderBy(f => f)
                .Join(_context.Users, t1 => t1, t2 => t2.UserId, (t1, t2) => t2)
                .Where(u => (u.FirstName + " " + u.LastName).Contains(name) || u.Username.Contains(name))
                .Select(u => u.UserId)
                .Skip(length)
                .Take(ModelConstants.takeLength)
                .ToListAsync();
            return ids;
        }

        public static async Task<List<int>> SelectPartFriend(MarshmallowChatContext _context, int id, int length)
        {
            List<int> ids = await _context.Friendships.Where(f1 => f1.User1Id == id)
                .Select(f1 => f1.User2Id)
                .Union(
                    _context.Friendships.Where(f2 => f2.User2Id == id)
                        .Select(f2 => f2.User1Id)
                )
                .Distinct()
                .OrderBy(f => f)
                .Skip(length)
                .Take(ModelConstants.takeLength)
                .ToListAsync();
            return ids;
        }

        public static async Task<Friendship> InsertAsync(MarshmallowChatContext _context, int id, int friendId)
        {
            DateTime now = DateTime.UtcNow.ToLocalTime();
            Friendship friendship = new Friendship() {
                User1Id = id,
                User2Id = friendId,
                DateCreated = now
            };
            EntityEntry entry = await _context.Friendships.AddAsync(friendship);
            await _context.SaveChangesAsync();
            if (entry.State == EntityState.Unchanged) return friendship;
            return null;
        }

        public static async Task<bool> CheckFriendExists(MarshmallowChatContext _context, int id, int friendId)
        {
            if (await _context.Friendships.Where(f => f.User1Id == id && f.User2Id == friendId).SingleOrDefaultAsync() != null 
                || await _context.Friendships.Where(f => f.User1Id == friendId && f.User2Id == id).SingleOrDefaultAsync() != null) return true;
            return false;
        }
    }
}
