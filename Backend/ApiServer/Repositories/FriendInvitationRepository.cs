using ApiServer.Constants;
using ApiServer.Models;
using Microsoft.EntityFrameworkCore;
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
    }
}
