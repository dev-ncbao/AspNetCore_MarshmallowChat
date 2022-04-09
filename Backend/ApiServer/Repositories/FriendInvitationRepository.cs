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
        public static async Task<List<int>> SelectPartFriendInvitation(MarshmallowChatContext _context, int id, int length)
        {
            List<int> ids = await _context.FriendInvitations.Where(f => f.To == id).Select(f => f.From).Skip(length).Take(ModelConstants.takeLength).ToListAsync();
            return ids;
        }

        public static async Task<FriendInvitation> SelectAsync(MarshmallowChatContext _context, int id, int strangerId)
        {
            FriendInvitation invitation = await _context.FriendInvitations.Where(f => f.From == id && f.To == strangerId || f.To == id && f.From == strangerId).FirstOrDefaultAsync();
            return invitation;
        }

        public static async Task<FriendInvitation> InsertAsync(MarshmallowChatContext _context, FriendInvitation invitation)
        {
            EntityEntry entry = await _context.FriendInvitations.AddAsync(invitation);
            await _context.SaveChangesAsync();
            if (entry.State == EntityState.Unchanged) return invitation;
            return null;
        }

        public static async Task<bool> DeleteAsync(MarshmallowChatContext _context, int id, int strangerId)
        {
            FriendInvitation invitation = await SelectAsync(_context, id, strangerId);
            EntityEntry entry = _context.FriendInvitations.Remove(invitation);
            await _context.SaveChangesAsync();
            if (entry.State == EntityState.Detached) return true;
            return false;
        }

        public static async Task<bool> InvitationWasExistedAsync(MarshmallowChatContext _context, int id, int strangerId)
        {
            FriendInvitation invitation = await _context.FriendInvitations.Where(f => f.From == id && f.To == strangerId || f.From == strangerId && f.To == id).FirstOrDefaultAsync();
            return invitation != null;
        }
    }
}
