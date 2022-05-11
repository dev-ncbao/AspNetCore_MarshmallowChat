using ApiServer.Constants;
using ApiServer.Helpers;
using ApiServer.Kafka;
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
        private readonly AdminKafka _adminKafka;
        public FriendController(MarshmallowChatContext context, AdminKafka adminKafka)
        {
            _context = context;
            _adminKafka = adminKafka;
        }
        //
        [HttpGet]
        [Route("~/api/user/{id:int}/friend/suggestion/{length:int?}")]
        public async Task<IActionResult> GetSuggestion(int id, int length = 0)
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            int requesterId = Convert.ToInt32(HttpContext.Request.Cookies[CookieConstants.id]);
            if (length < 0 || id != requesterId) return BadRequest();
            List<int> ids = await FriendshipRepository.SelectSuggestionPart(_context, id, length);
            return Ok(await JsonUtil.SerializeAsync(ids));
        }
        //
        [HttpGet]
        [Route("~/api/user/{id:int}/friend/invitation/{length:int?}")]
        public async Task<IActionResult> GetInvitations(int id, int length = 0)
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            int requesterId = Convert.ToInt32(HttpContext.Request.Cookies[CookieConstants.id]);
            if (length < 0 || id != requesterId) return BadRequest();
            List<int> ids = await FriendInvitationRepository.SelectPartAsync(_context, id, length);
            return Ok(await JsonUtil.SerializeAsync(ids));
        }

        [HttpPost]
        [Route("~/api/user/{id:int}/friend/invitation/{strangerId:int}")]
        public async Task<IActionResult> AddInvitation(int id, int strangerId)
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            int requestId = Convert.ToInt32(HttpContext.Request.Cookies[CookieConstants.id]);
            if (requestId != id || !await UserRepository.UserExistsAsync(_context, strangerId)) return BadRequest();
            if (await FriendshipRepository.ExistsAsync(_context, id, strangerId) || await FriendInvitationRepository.ExistsAsync(_context, id, strangerId)) return Conflict();
            FriendInvitation invitation = new FriendInvitation()
            {
                From = id,
                To = strangerId,
                DateCreated = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
            };
            invitation = await FriendInvitationRepository.InsertAsync(_context, invitation);
            if (invitation == null) return StatusCode(500);
            return Created("", null);
        }

        [HttpDelete]
        [Route("~/api/user/{id:int}/friend/invitation/{strangerId:int}")]
        public async Task<IActionResult> DeleteInvitation(int id, int strangerId)
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            int requestId = Convert.ToInt32(HttpContext.Request.Cookies[CookieConstants.id]);
            if (requestId != id || !await UserRepository.UserExistsAsync(_context, strangerId) || !await FriendInvitationRepository.ExistsAsync(_context, id, strangerId)) return BadRequest();
            if (!await FriendInvitationRepository.DeleteAsync(_context, id, strangerId)) return StatusCode(500);
            return Ok();
        }
        //
        [HttpGet]
        [Route("~/api/user/{id:int}/friend/{length:int?}")]
        public async Task<IActionResult> GetFriends(int id, int length = 0)
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            int requesterId = Convert.ToInt32(HttpContext.Request.Cookies[CookieConstants.id]);
            if (length < 0 || id != requesterId) return BadRequest();
            List<int> ids = await FriendshipRepository.SelectPart(_context, id, length);
            return Ok(await JsonUtil.SerializeAsync(ids));
        }



        [HttpPost]
        [Route("~/api/user/{id:int}/friend/{friendId:int}")]
        public async Task<IActionResult> AddFriend(int id, int friendId)
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) 
                return Unauthorized();
            int requesterId = Convert.ToInt32(HttpContext.Request.Cookies[CookieConstants.id]);
            if (requesterId != id || !await UserRepository.UserExistsAsync(_context, friendId)) 
                return BadRequest();
            if (await FriendshipRepository.ExistsAsync(_context, id, friendId) || await RoomRepository.ExistsAsync(_context, id, friendId)) 
                return Conflict();
            Friendship friendship = await FriendshipRepository.InsertAsync(_context, id, friendId);
            int? roomId = await RoomRepository.InsertAsync(_context, id, friendId);
            if (friendship == null || !await FriendInvitationRepository.DeleteAsync(_context, id, friendId) || !roomId.HasValue)
                return StatusCode(500);
            _adminKafka.CreateTopic(new Confluent.Kafka.Admin.TopicSpecification()
            {
                Name = $"MLC-Topic{roomId.Value}"
            });
            return Created("", await JsonUtil.SerializeAsync(roomId.Value));
        }

        [HttpDelete]
        [Route("~/api/user/{id:int}/friend/{friendId:int}")]
        public async Task<IActionResult> DeleteFriend(int id, int friendId)
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            int requesterId = Convert.ToInt32(HttpContext.Request.Cookies[CookieConstants.id]);
            if (requesterId != id || !await UserRepository.UserExistsAsync(_context, friendId) || !await FriendshipRepository.ExistsAsync(_context, id, friendId)) return BadRequest();
            if (!await FriendshipRepository.DeleteAsync(_context, id, friendId)) return StatusCode(500);
            return Ok();
        }
    }
}
