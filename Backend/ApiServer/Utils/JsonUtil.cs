﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using System.IO;
namespace ApiServer.Utils
{
    public class JsonUtil
    {
        public static string Serialize<T>(T t)
        {
            return JsonSerializer.Serialize(t);
        }

        public static async Task<string> SerializeAsync<T>(T t)
        {
            Task<string> task = new Task<string>(
                () => JsonSerializer.Serialize(t)
            );
            task.Start();
            string result = await task;
            return result;
        }

        public static T Deserialize<T>(string data)
        {
            return JsonSerializer.Deserialize<T>(data);
        }

        public static async Task<T> DeserializeAsync<T>(string data)
        {
            Task<T> task = new Task<T>(
                () => JsonSerializer.Deserialize<T>(data)
            );
            task.Start();
            T result = await task;
            return result;
        }
    }
}
