using ApiServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegisterController: Controller
    {
        private readonly ILogger<RegisterController> _logger;
        private MarshmallowChatContext _db;

        public RegisterController(ILogger<RegisterController> logger, MarshmallowChatContext db)
        {
            _logger = logger;
            _db = db;
        }

        
    }
}
