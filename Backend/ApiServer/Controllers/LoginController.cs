using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using JsonDocument = System.Text.Json.JsonDocument;
using ApiServer.Utils;
using System.Threading.Tasks;
using ApiServer.Models;
using System.Linq;
using System;
using Microsoft.AspNetCore.Http;
using ApiServer.Repositories;
using ApiServer.Services;
using Microsoft.AspNetCore.Authorization;

namespace ApiServer {
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase {
        private readonly ILogger<LoginController> _logger;
        public LoginController(ILogger<LoginController> logger){
            _logger = logger;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Post(JsonDocument jd){
            string payload = jd.RootElement.GetRawText();
            User user = await JsonUtils<User>.DeserializeAsync(payload);
            //
            User userFound = UserRepository.Get(user.Username, user.Password);
            if (userFound != null)
            {
                string responseData = await JsonUtils<object>.SerializeAsync(new { token = TokenService.CreateToken(userFound) });
                return Ok(responseData);
            }
            else return NotFound();
        }

        [HttpGet]
        [Authorize]
        public string Get()
        {
            return "hi";
        }
    }
}