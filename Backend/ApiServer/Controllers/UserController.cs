using ApiServer.Constants;
using ApiServer.Helpers;
using ApiServer.Models;
using ApiServer.Repositories;
using ApiServer.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace ApiServer.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly MarshmallowChatContext _context;

        public UserController(ILogger<UserController> logger, MarshmallowChatContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            if (!await ControllerHelper.CheckAuthentication(_context, HttpContext)) return Unauthorized();
            CustomModels.User user = await UserRepository.SelectCustomUserAsync(_context, id);
            return Ok(await JsonUtil.SerializeAsync<CustomModels.User>(user));
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Post(JsonDocument jd)
        {
            string upload = jd.RootElement.GetRawText();
            User user = await JsonUtil.DeserializeAsync<User>(upload);
            user.DateCreated = DateTime.UtcNow.ToLocalTime();
            if (TryValidateModel(user))
            {
                user.Password = await EncryptionUtil.SHA256HashAsync(user.Password);
                user.Secret = await EncryptionUtil.SHA256HashAsync(user.Username + user.Password + user.UserId);
                if (await UserRepository.UsernameWasExistedAsync(_context, user.Username))
                    return Conflict(await JsonUtil.SerializeAsync<object>(new
                    {
                        message = "Tên người dùng đã được sử dụng"
                    }));
                if (await UserRepository.EmailWasExistedAsync(_context, user.Email))
                    return Conflict(await JsonUtil.SerializeAsync<object>(new
                    {
                        message = "Email đã được sử dụng"
                    }));
                user = await UserRepository.InsertAsync(_context, user);
                if (user == null) return StatusCode(500, await JsonUtil.SerializeAsync<object>(new { message = "Lỗi máy chủ"}));
                user.Password = "";
                user.Secret = "";
                string payload = await JsonUtil.SerializeAsync<User>(user);
                return CreatedAtRoute("", user.UserId, payload);
            }
            return BadRequest();
        }
    }
}
