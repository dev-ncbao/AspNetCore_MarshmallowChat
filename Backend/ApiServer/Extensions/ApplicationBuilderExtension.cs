using ApiServer.CustomModels;
using ApiServer.Middlewares;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiServer.Extensions
{
    public static class ApplicationBuilderExtension
    {
        public static IApplicationBuilder UseAddHeader(this IApplicationBuilder builder, Action<HeaderModel> configureOptions)
        {
            HeaderModel options = new HeaderModel();
            configureOptions(options);

            return builder.UseMiddleware<AddHeaderMiddleware>(options);
        }
    }
}
