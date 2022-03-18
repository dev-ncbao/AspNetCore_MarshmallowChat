using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using JsonDocument = System.Text.Json.JsonDocument;
using ApiServer.Utils;
using System.Threading.Tasks;
using ApiServer.Models;
using ApiServer.Repositories;
using ApiServer.Services;
using Microsoft.AspNetCore.Authorization;

namespace ApiServer
{
    [ApiController]
    [Route("api/login")]
    [AllowAnonymous]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;

        public LoginController(ILogger<LoginController> logger){
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Post(JsonDocument jd){
            string upload = jd.RootElement.GetRawText();
            User user = await JsonUtil<User>.DeserializeAsync(upload);
            user = await UserRepository.Select(user.Username, user.Password);
            if (user == null)
                return NotFound();
            else
            {
                string payload = await JsonUtil<dynamic>.SerializeAsync(new { token = TokenService.CreateToken(user) });
                return Ok(payload);
            }
        }
    }
}