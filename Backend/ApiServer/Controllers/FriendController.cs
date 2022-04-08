using ApiServer.Constants;
using ApiServer.Helpers;
using ApiServer.Models;
using ApiServer.Repositories;
using ApiServer.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiServer.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/friend")]
    public class FriendController : ControllerBase
    {
        private readonly MarshmallowChatContext _context;

        public FriendController(MarshmallowChatContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("~/api/user/{id:int}/friend/invitaion/{length:int?}")]
        public async Task<IActionResult> GetInvitations(int id, int length = 0)
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            int requesterId = Convert.ToInt32(HttpContext.Request.Cookies[CookieConstants.id]);
            if (length < 0 || id != requesterId) return BadRequest();
            List<int> ids = await FriendInvitationRepository.SelectPartFriendInvitation(_context, id, length);
            return Ok(await JsonUtil.SerializeAsync(ids));
        }

        [HttpGet]
        [Route("~/api/user/{id:int}/friend/{length:int?}")]
        public async Task<IActionResult> GetFriends(int id, int length = 0)
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            int requesterId = Convert.ToInt32(HttpContext.Request.Cookies[CookieConstants.id]);
            if (length < 0 || id != requesterId) return BadRequest();
            List<int> ids = await FriendshipRepository.SelectPartFriend(_context, id, length);
            return Ok(await JsonUtil.SerializeAsync(ids));
        }



        [HttpPost]
        [Route("~/api/user/{id:int}/friend/{friendId:int}")]
        public async Task<IActionResult> AddFriend(int id, int friendId)
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            int requesterId = Convert.ToInt32(HttpContext.Request.Cookies[CookieConstants.id]);
            User user = await UserRepository.SelectAsync(_context, id);
            if (await FriendshipRepository.CheckFriendExists(_context, id, friendId)) return Conflict();
            if (requesterId != id || user == null) return BadRequest();
            Friendship friendship = await FriendshipRepository.InsertAsync(_context, id, friendId);
            if (friendship == null) return StatusCode(500);
            return Created("", null);
        }
    }
}
