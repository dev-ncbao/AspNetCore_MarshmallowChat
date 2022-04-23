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
    public static class FriendInvitationRepository
    {
        public static async Task<List<int>> SelectPartAsync(MarshmallowChatContext _context, int userId, int length)
        {
            List<int> ids = await _context.FriendInvitations.Where(f => f.To == userId).Select(f => f.From).Skip(length).Take(ModelConstants.takeLength).ToListAsync();
            return ids;
        }

        public static async Task<FriendInvitation> SelectAsync(MarshmallowChatContext _context, int userId, int strangerId)
        {
            FriendInvitation invitation = await _context.FriendInvitations.Where(f => f.From == userId && f.To == strangerId || f.To == userId && f.From == strangerId).FirstOrDefaultAsync();
            return invitation;
        }

        public static async Task<FriendInvitation> InsertAsync(MarshmallowChatContext _context, FriendInvitation invitation)
        {
            EntityEntry entry = await _context.FriendInvitations.AddAsync(invitation);
            await _context.SaveChangesAsync();
            if (entry.State == EntityState.Unchanged) return invitation;
            return null;
        }

        public static async Task<bool> DeleteAsync(MarshmallowChatContext _context, int userId, int strangerId)
        {
            FriendInvitation invitation = await SelectAsync(_context, userId, strangerId);
            EntityEntry entry = _context.FriendInvitations.Remove(invitation);
            await _context.SaveChangesAsync();
            if (entry.State == EntityState.Detached) return true;
            return false;
        }

        public static async Task<bool> ExistsAsync(MarshmallowChatContext _context, int userId, int strangerId)
        {
            FriendInvitation invitation = await _context.FriendInvitations.Where(f => f.From == userId && f.To == strangerId || f.From == strangerId && f.To == userId).FirstOrDefaultAsync();
            return invitation != null;
        }

        public static bool Exists(MarshmallowChatContext _context, int userId, int strangerId)
        {
            FriendInvitation invitation = _context.FriendInvitations.Where(f => f.From == userId && f.To == strangerId || f.From == strangerId && f.To == userId).FirstOrDefault();
            return invitation != null;
        }
    }
}
