using ApiServer.Models;
using ApiServer.Repositories;
using ApiServer.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
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
                string payload = await JsonUtil<User>.SerializeAsync(user);
                return Ok(payload);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            IEnumerable<User> users = await UserRepository.SelectAll();
            if(users == null)
                return NotFound();
            else
            {
                string payload = await JsonUtil<IEnumerable<User>>.SerializeAsync(users);
                return Ok(payload);
            }
        }
    }
}
