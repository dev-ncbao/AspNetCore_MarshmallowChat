using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using JsonDocument = System.Text.Json.JsonDocument;
using ApiServer.Utils;
using System.Threading.Tasks;
using ApiServer.Models;
using ApiServer.Repositories;
using Microsoft.AspNetCore.Authorization;
using System;
using ApiServer.Helpers;
using ApiServer.Constants;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace ApiServer
{
    [Authorize]
    [ApiController]
    [Route("api/login")]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly MarshmallowChatContext _context;

        public LoginController(ILogger<LoginController> logger, MarshmallowChatContext context)
        {
            _logger = logger;
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("~/api/user/{id:int}/friend/invitation/{length:int?}")]
        public async Task<IActionResult> Test(int id, string name, int length = 0)
        {
            //if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            int requesterId = Convert.ToInt32(HttpContext.Request.Cookies[CookieConstants.id]);
            List<int> ids = await FriendInvitationRepository.SelectPartFriendInvitation(_context, id, length);
            //if (requesterId != id || user == null) return BadRequest();
            return Ok(await JsonUtil.SerializeAsync(ids));
        }

        [HttpGet]
        [Route("~/api/logout")]
        public async Task<IActionResult> Logout()
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            int id = Convert.ToInt32(HttpContext.Request.Cookies[CookieConstants.id]);
            User user = await UserRepository.SelectAsync(_context, id);
            await ControllerHelper.RemoveResponseCookieAsync(HttpContext, user);
            return Ok();
        }

        [HttpGet]
        [Route("check")]
        public async Task<IActionResult> CheckLogin()
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Post(JsonDocument jd)
        {
            string upload = jd.RootElement.GetRawText();
            User user = await JsonUtil.DeserializeAsync<User>(upload);
            user.Password = await EncryptionUtil.SHA256HashAsync(user.Password);
            user = await UserRepository.SelectAsync(_context, user.Username, user.Password);
            if (user == null)
                return Unauthorized(await JsonUtil.SerializeAsync<object>(new
                {
                    message = "Tên đăng nhập hoặc mật khẩu không chính xác"
                }));
            await ControllerHelper.SetResponseCookieAsync(HttpContext, user);
            return Ok();
        }
    }
}