using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiServer.Models;
using ApiServer.Repositories;
using Confluent.Kafka;
using Confluent.Kafka.Admin;

namespace ApiServer.Kafka
{
    public class AdminKafka
    {
        private IAdminClient Manage;
        private MarshmallowChatContext _context;
        public AdminKafka(MarshmallowChatContext context)
        {
            AdminClientConfig config = new AdminClientConfig();
            config.BootstrapServers = "localhost:9092";
            config.ClientId = "MLC-ServerAdmin";
            AdminClientBuilder builder = new AdminClientBuilder(config);
            Manage = builder.Build();
            //
            _context = context;
        }

        public async Task InitialTopics()
        {
            List<string> topics = await RoomRepository.SelectAllTopicAsync(_context);
            List<TopicSpecification> topicSpecs = new List<TopicSpecification>();
            foreach (var topic in topics) {
                topicSpecs.Add(new TopicSpecification()
                {
                    Name = topic
                });
            };
            await Manage.CreateTopicsAsync(topicSpecs);
        }

        public async Task CreateTopic(TopicSpecification topicSpec)
        {
            List<TopicSpecification> topicSpecs = new List<TopicSpecification>()
            {
                topicSpec
            };
            await Manage.CreateTopicsAsync(topicSpecs);
        }
    }
}
