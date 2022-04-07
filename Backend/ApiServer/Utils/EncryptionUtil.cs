using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ApiServer.Utils
{
    public static class EncryptionUtil
    {
        public static async Task<string> SHA256HashAsync(string input)
        {
            byte[] inputBytes = Encoding.UTF8.GetBytes(input);
            MemoryStream stream = new MemoryStream(inputBytes);
            SHA256 sha = SHA256.Create();
            byte[] hashResult = await sha.ComputeHashAsync(stream);
            StringBuilder builder = new StringBuilder();
            foreach (byte aByte in hashResult)
            {
                builder.Append(aByte.ToString("x2"));
            }
            return builder.ToString();
        }
    }
}
