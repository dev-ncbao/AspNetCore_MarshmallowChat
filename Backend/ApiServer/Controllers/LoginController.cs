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
using ApiServer.Controllers;
using ApiServer.CustomModels;

namespace ApiServer
{
    [Authorize]
    [ApiController]
    [Route("api/login")]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;
        private readonly MarshmallowChatContext _context;
        //private readonly IServiceProvider _provider;

        public LoginController(ILogger<LoginController> logger, MarshmallowChatContext context, IServiceProvider provider)
        {
            _logger = logger;
            _context = context;
            //_provider = provider;
        }

        /*[AllowAnonymous]
        [HttpGet]
        [Route("~/api/user/{id:int}/room/{roomId:int}/message")]
        public async Task<IActionResult> Test(int id, int roomId)
        {
            return Ok(await JsonUtil.SerializeAsync<List<MessageModel>>(await MessageRepository.SelectMessage(_context, roomId, 0)));
        }*/

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