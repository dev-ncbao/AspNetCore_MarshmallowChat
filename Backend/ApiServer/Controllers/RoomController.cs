using ApiServer.Constants;
using ApiServer.CustomModels;
using ApiServer.Helpers;
using ApiServer.Models;
using ApiServer.Repositories;
using ApiServer.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
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

        [HttpPost]
        [Route("~/api/user/{userId:int}/rooms/info")]
        public async Task<IActionResult> GetListRoomInfo(int userId, JsonDocument js)
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            List<RoomModel> payload = js.RootElement.Deserialize<List<RoomModel>>();
            List<RoomModel> responsePayload = await RoomRepository.SelectPartAsync(_context, userId, payload);
            return Ok(await JsonUtil.SerializeAsync(responsePayload));
        }

        [HttpGet]
        [Route("~/api/user/{id:int}/room/{roomId:int}/member")]
        public async Task<IActionResult> GetRoomMember(int id, int roomId)
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            int requestId = Convert.ToInt32(HttpContext.Request.Cookies[CookieConstants.id]);
            if (requestId != id || !await RoomMemberRepository.Exists(_context, roomId, id)) return BadRequest();
            List<int> memberIds = RoomMemberRepository.SelectExceptSeft(_context, roomId, id);
            List<UserModel> members = new List<UserModel>();
            foreach(int memId in memberIds)
            {
                members.Add(await UserRepository.SelectShortInfoAsync(_context, memId));
            }
            return Ok(await JsonUtil.SerializeAsync(members));
        }

        [HttpGet]
        [Route("~/api/user/{id:int}/topic")]
        public async Task<IActionResult> GetListTopic(int id)
        {
            StringValues cookieString;
            HttpContext.Request.Headers.TryGetValue(HeaderConstants.XCookies, out cookieString);
            var cookies = CookieUtil.ToDictionary(cookieString);
            int requestId = Convert.ToInt32(cookies[CookieConstants.id]);
            if (id != requestId || !await ControllerHelper.CheckAuthentication(_context, cookies))
                return Unauthorized();
            List<string> topics = await RoomRepository.SelectTopicAsync(_context, id);
            return Ok(await JsonUtil.SerializeAsync(topics));
        }
    }
}
