using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using JsonDocument = System.Text.Json.JsonDocument;
using ApiServer.Models.AppModels;
using ApiServer.Utils;
using System.Threading.Tasks;

namespace ApiServer {
    [ApiController]
    [Route("[controller]")]
    public class LoginController : Controller {
        private readonly ILogger<LoginController> _logger;

        public LoginController(ILogger<LoginController> logger){
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Post(JsonDocument jd){
            string payload = jd.RootElement.GetRawText();
            Account obj = await JsonUtils<Account>.DeserializeAsync(payload);
            return Json(obj);
        }
    }
}