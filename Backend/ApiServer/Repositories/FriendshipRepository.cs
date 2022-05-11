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
        public static async Task<List<int>> SelectSuggestionPart(MarshmallowChatContext _context, int userId, int length)
        {
            List<int> ids = await _context.Users.Where(u => u.UserId != userId)
                .Skip(length)
                .Take(ModelConstants.takeLength)
                .Select(u => u.UserId)
                .ToListAsync<int>();
            var copyIds = ids.ToList();
            ids.ForEach(eachId =>
            {
                if (Exists(_context, userId, eachId) || FriendInvitationRepository.Exists(_context, userId, eachId))
                    copyIds.Remove(eachId);
            });
            return copyIds;
        }
        public static async Task<List<int>> SelectFindPart(MarshmallowChatContext _context, int userId, string name, int length)
        {
            List<int> ids = await _context.Friendships.Where(f1 => f1.User1Id == userId)
                .Select(f1 => f1.User2Id)
                .Union(
                    _context.Friendships.Where(f2 => f2.User2Id == userId)
                        .Select(f2 => f2.User1Id)
                )
                .Distinct()
                .OrderBy(f => f)
                .Join(_context.Users, t1 => t1, t2 => t2.UserId, (t1, t2) => t2)
                .Where(u => (u.FirstName + " " + u.LastName).Contains(name) || u.Username.Contains(name))
                .Skip(length)
                .Take(ModelConstants.takeLength)
                .Select(u => u.UserId)
                .ToListAsync();
            return ids;
        }

        public static async Task<List<int>> SelectPart(MarshmallowChatContext _context, int userId, int length)
        {
            List<int> ids = await _context.Friendships.Where(f1 => f1.User1Id == userId)
                .Select(f1 => f1.User2Id)
                .Union(
                    _context.Friendships.Where(f2 => f2.User2Id == userId)
                        .Select(f2 => f2.User1Id)
                )
                .Distinct()
                .OrderBy(f => f)
                .Skip(length)
                .Take(ModelConstants.takeLength)
                .ToListAsync();
            return ids;
        }

        public static async Task<Friendship> SelectAsync(MarshmallowChatContext _context, int userId, int friendId)
        {
            Friendship friendship = await _context.Friendships.Where(f => f.User1Id == userId && f.User2Id == friendId || f.User2Id == userId && f.User1Id == friendId).FirstOrDefaultAsync();
            return friendship;
        }

        public static async Task<Friendship> InsertAsync(MarshmallowChatContext _context, int userId, int friendId)
        {
            Friendship friendship = new Friendship() {
                User1Id = userId,
                User2Id = friendId,
                DateCreated = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
            };
            EntityEntry entry = await _context.Friendships.AddAsync(friendship);
            await _context.SaveChangesAsync();
            if (entry.State == EntityState.Unchanged) return friendship;
            return null;
        }

        public static async Task<bool> DeleteAsync(MarshmallowChatContext _context, int userId, int friendId)
        {
            Friendship friendship = await SelectAsync(_context, userId, friendId);
            EntityEntry entry = _context.Friendships.Remove(friendship);
            await _context.SaveChangesAsync();
            if (entry.State == EntityState.Detached) return true;
            return false;
        }

        public static async Task<bool> ExistsAsync(MarshmallowChatContext _context, int userId, int friendId)
        {
            Friendship friendship = await _context.Friendships.Where(f => f.User1Id == userId && f.User2Id == friendId || f.User2Id == userId && f.User1Id == friendId).FirstOrDefaultAsync();
            return friendship != null;
        }

        public static bool Exists(MarshmallowChatContext _context, int userId, int friendId)
        {
            Friendship friendship = _context.Friendships.Where(f => f.User1Id == userId && f.User2Id == friendId || f.User2Id == userId && f.User1Id == friendId).FirstOrDefault();
            return friendship != null;
        }
    }
}
