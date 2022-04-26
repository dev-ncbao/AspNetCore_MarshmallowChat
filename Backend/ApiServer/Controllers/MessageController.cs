using ApiServer.Constants;
using ApiServer.CustomModels;
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
    [Route("api/message")]
    public class MessageController : ControllerBase
    {
        private readonly MarshmallowChatContext _context;

        public MessageController(MarshmallowChatContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("~/api/user/{id:int}/room/{roomId:int}/message/{length:int?}")]
        public async Task<IActionResult> GetMessage(int id, int roomId, int length = 0)
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext))
                return Unauthorized();
            int requestId = Convert.ToInt32(HttpContext.Request.Cookies[CookieConstants.user_id]);
            if (requestId != id || !await RoomMemberRepository.Exists(_context, roomId, id))
                return BadRequest();
            List<MessageModel> messages = await MessageRepository.SelectMessage(_context, roomId, length);
            if (messages == null)
                return StatusCode(500);
            return Ok(await JsonUtil.SerializeAsync(messages));
        }
    }
}
