using ApiServer.CustomModels;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiServer.Middlewares
{
    public class AddHeaderMiddleware
    {
        private readonly HeaderModel _header;
        private readonly RequestDelegate _next;
        public AddHeaderMiddleware() { }
        public AddHeaderMiddleware(RequestDelegate next, HeaderModel header)
        {
            _header = header;
            _next = next;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            context.Response.OnStarting(() =>
            {
                if (context.Response.Headers.ContainsKey(_header.Key))
                    context.Response.Headers.Remove(_header.Key);
                context.Response.Headers.Add(_header.Key, _header.Value);
                return Task.FromResult(0);
            });
            await _next(context);
        }
    }
}
