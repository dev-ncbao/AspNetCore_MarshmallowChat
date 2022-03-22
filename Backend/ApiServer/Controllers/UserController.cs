using ApiServer.Models;
using ApiServer.Repositories;
using ApiServer.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace ApiServer.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetUser(int id)
        {
            User user = await UserRepository.Select(id);
            if (user == null)
                return NotFound();
            else
            {
                user.Password = "";
                string payload = await JsonUtil.SerializeAsync<User>(user);
                return Ok(payload);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            IEnumerable<User> users = await UserRepository.SelectAll();
            if (users == null)
                return NotFound();
            else
            {
                string payload = await JsonUtil.SerializeAsync<IEnumerable<User>>(users);
                return Ok(payload);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(JsonDocument jd)
        {
            string upload = jd.RootElement.GetRawText();
            User user = await JsonUtil.DeserializeAsync<User>(upload);
            user.DateCreated = DateTime.UtcNow.ToLocalTime();
            if (TryValidateModel(user))
            {
                if (await UserRepository.UsernameWasExisted(user.Username))
                {
                    return Conflict(await JsonUtil.SerializeAsync<object>(new { 
                        message = "Tên người dùng đã được sử dụng" 
                    }));
                }
                if (await UserRepository.EmailWasExisted(user.Email))
                    return Conflict(await JsonUtil.SerializeAsync<object>(new {
                        message = "Email đã được sử dụng" 
                    }));
                user = await UserRepository.Insert(user);
                if (user != null)
                {
                    string payload = await JsonUtil.SerializeAsync<User>(user);
                    return CreatedAtRoute("", user.UserId, payload);
                }
                else return StatusCode(500, await JsonUtil.SerializeAsync<object>(new { 
                    message = "Lỗi máy chủ"
                }));
            }
            else return BadRequest();
        }
    }
}
