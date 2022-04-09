using ApiServer.Constants;
using ApiServer.Models;
using ApiServer.Repositories;
using ApiServer.Services;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace ApiServer.Helpers
{
    public static class ControllerHelper
    {
        public static async Task<bool> CheckAuthentication(MarshmallowChatContext _context, HttpContext httpContext)
        {
            int id = Convert.ToInt32(httpContext.Request.Cookies[CookieConstants.id]);
            string secret = httpContext.Request.Cookies[CookieConstants.secret];
            User user = await UserRepository.SelectAsync(_context, id, secret);
            if(user != null)
            {
                await RefreshToken(httpContext, user);
            }
            return user != null;
        }

        public static async Task SetResponseCookieAsync(HttpContext _context, User user)
        {
            await ConfigureResponseCookie(_context, user, DateTime.UtcNow.ToLocalTime().AddDays(1));
        }

        public static async Task RemoveResponseCookieAsync(HttpContext _context, User user)
        {
            await ConfigureResponseCookie(_context, user, DateTime.UtcNow.ToLocalTime().AddDays(-1));
        }

        private static async Task ConfigureResponseCookie(HttpContext _context, User user, DateTime expires)
        {
            string domain = "localhost";
            _context.Response.Cookies.Append(CookieConstants.token, TokenService.CreateToken(user), new CookieOptions()
            {
                SameSite = SameSiteMode.None,
                Domain = domain,
                Secure = true,
                Expires = expires
            });
            _context.Response.Cookies.Append(CookieConstants.id, user.UserId.ToString(), new CookieOptions()
            {
                SameSite = SameSiteMode.None,
                Domain = domain,
                Secure = true,
                Expires = expires,
                HttpOnly = true
            });
            _context.Response.Cookies.Append(CookieConstants.user_id, user.UserId.ToString(), new CookieOptions()
            {
                SameSite = SameSiteMode.None,
                Domain = domain,
                Secure = true,
                Expires = expires,
                HttpOnly = false
            });
            _context.Response.Cookies.Append(CookieConstants.secret, user.Secret, new CookieOptions()
            {
                SameSite = SameSiteMode.None,
                Domain = domain,
                Secure = true,
                Expires = expires,
                HttpOnly = true
            });
            _context.Response.Cookies.Append(CookieConstants.expires, expires.ToString(), new CookieOptions()
            {
                SameSite = SameSiteMode.None,
                Domain = domain,
                Secure = true,
                Expires = expires,
                HttpOnly = true
            });
        }

        public static async Task RefreshToken(HttpContext _context, User user)
        {
            string expires = _context.Request.Cookies[CookieConstants.expires];
            DateTime expiresTime = Convert.ToDateTime(expires);
            DateTime now = DateTime.UtcNow.ToLocalTime();
            if(expiresTime.Date == now.Date && expiresTime.Hour - now.Hour <= 4)
            {
                await SetResponseCookieAsync(_context, user);
            }
        }
    }
}
