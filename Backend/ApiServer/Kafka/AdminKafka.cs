using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Confluent.Kafka;

namespace ApiServer.Kafka
{
    public class AdminKafka
    {
        public IAdminClient Manage;
        public AdminKafka()
        {
            AdminClientConfig config = new AdminClientConfig();
            config.BootstrapServers = "localhost:9092";
            config.ClientId = "MLC-ServerAdmin";
            AdminClientBuilder builder = new AdminClientBuilder(config);
            Manage = builder.Build();
        }
    }
}
