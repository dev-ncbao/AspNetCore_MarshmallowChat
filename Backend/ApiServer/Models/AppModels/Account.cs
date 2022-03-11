using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiServer.Models.AppModels
{
    public class Account
    {
        [Required]
        [StringLength(64)]
        public string Password { get; set; }
        [Required]
        [StringLength(100)]
        public string AccountName { get; set; }
    }
}
