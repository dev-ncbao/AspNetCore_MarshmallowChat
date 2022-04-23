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
using System.Text.Json;
using System.Threading.Tasks;

namespace ApiServer.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/room")]
    public class RoomController : ControllerBase
    {
        private readonly MarshmallowChatContext _context;
        public RoomController(MarshmallowChatContext context)
        {
            _context = context;
        }
        [HttpGet]
        [Route("~/api/user/{id:int}/friend/{friendId:int}/room")]
        public async Task<IActionResult> GetRoom(int id, int friendId)
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            int requestId = Convert.ToInt32(HttpContext.Request.Cookies[CookieConstants.id]);
            if (requestId != id || !await FriendshipRepository.ExistsAsync(_context, id, friendId)) return BadRequest();
            int roomId = await RoomRepository.SelectAsync(_context, id, friendId);
            if (roomId == -1) return StatusCode(500);
            return Ok(await JsonUtil.SerializeAsync(roomId));
        }

        [HttpGet]
        [Route("~/api/user/{id:int}/room/{roomId:int}/info")]
        public async Task<IActionResult> GetRoomInfo(int id, int roomId)
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            int requestId = Convert.ToInt32(HttpContext.Request.Cookies[CookieConstants.id]);
            if (requestId != id || !await RoomMemberRepository.Exists(_context, roomId, id)) return BadRequest();
            RoomModel roomModel = await RoomRepository.SelectWithLastMessageAsync(_context, roomId, id);
            if (roomModel == null) return StatusCode(500);
            return Ok(await JsonUtil.SerializeAsync(roomModel));
        }

        [HttpPost]
        [Route("~/api/user/{id:int}/rooms")]
        public async Task<IActionResult> GetListRoom(int id, JsonDocument js)
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            List<int> reqRoomIds = js.RootElement.Deserialize<List<int>>();
            List<int> roomIds = await RoomRepository.SelectPartAsync(_context, id, reqRoomIds);
            return Ok(await JsonUtil.SerializeAsync(roomIds));
        }
    }
}
