using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using JsonDocument = System.Text.Json.JsonDocument;
using ApiServer.Utils;
using System.Threading.Tasks;
using ApiServer.Models;
using ApiServer.Repositories;
using ApiServer.Services;
using Microsoft.AspNetCore.Authorization;
using System;
using Microsoft.AspNetCore.Http;

namespace ApiServer
{
    [ApiController]
    [Route("api/login")]
    public class LoginController : ControllerBase
    {
        private readonly ILogger<LoginController> _logger;

        public LoginController(ILogger<LoginController> logger)
        {
            _logger = logger;
        }

        [Authorize]
        [Route("refresh/{id:int}")]
        [HttpGet]
        public async Task<IActionResult> RefreshToken(int id)
        {
            User user = await UserRepository.Select(id);
            if (user == null) return BadRequest();
            else
            {
                return Ok(await JsonUtil.SerializeAsync<object>(new
                {
                    token = TokenService.CreateToken(user),
                    expireTime = DateTime.UtcNow.ToLocalTime().AddHours(23)
                }));
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Post(JsonDocument jd)
        {
            string upload = jd.RootElement.GetRawText();
            User user = await JsonUtil.DeserializeAsync<User>(upload);
            user = await UserRepository.Select(user.Username, user.Password);
            if (user == null)
                return Unauthorized(await JsonUtil.SerializeAsync<object>(new
                {
                    message = "Tên đăng nhập hoặc mật khẩu không chính xác"
                }));
            else
            {
                //Set cookie not working
                /*Response.Cookies.Append("token", TokenService.CreateToken(user), new CookieOptions()
                {
                    Expires = DateTime.UtcNow.ToLocalTime().AddHours(24),
                    SameSite = SameSiteMode.None,
                    Secure = true,
                    Domain = "localhost",
                    HttpOnly = false,
                    Path = "/"
                });
                Response.Cookies.Append("userId", user.UserId.ToString(), new CookieOptions()
                {
                    Expires = DateTime.UtcNow.ToLocalTime().AddHours(24),
                    SameSite = SameSiteMode.None,
                    Secure = true,
                    Domain = "localhost",
                    HttpOnly = false,
                    Path = "/"
                });
                */
                return Ok(await JsonUtil.SerializeAsync<object>(new
                {
                    token = TokenService.CreateToken(user),
                    userId = user.UserId,
                    expireTime = DateTime.UtcNow.ToLocalTime().AddHours(23)
                }));
            }
        }
    }
}