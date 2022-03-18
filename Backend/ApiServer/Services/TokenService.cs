using ApiServer.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ApiServer.Services
{
    public class TokenService
    {
        private const double EXPIRES_HOURS = 24.0;
        public static string CreateToken(User user)
        {   
            byte[] key = Encoding.UTF8.GetBytes(Setting.Secret);
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor() {
                Expires = DateTime.UtcNow.AddHours(EXPIRES_HOURS),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Claims = new Dictionary<string, object>()
                {
                    { ClaimTypes.NameIdentifier, user.UserId}
                }
            };
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
