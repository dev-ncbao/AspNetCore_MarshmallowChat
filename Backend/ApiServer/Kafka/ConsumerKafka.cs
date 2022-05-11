using ApiServer.CustomModels;
using ApiServer.Models;
using ApiServer.Repositories;
using ApiServer.Utils;
using Confluent.Kafka;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ApiServer.Kafka
{
    public class ConsumerKafka
    {
        private IConsumer<string, string> Consumer;
        private MarshmallowChatContext _context;
        private CancellationTokenSource CancellationToken;
        public ConsumerKafka(MarshmallowChatContext context)
        {
            ConsumerConfig config = new ConsumerConfig();
            config.MessageMaxBytes = 52428800;
            config.GroupId = "MLC-ServerConsumerGroup";
            config.ClientId = "MLC-ServerConsumer";
            config.BootstrapServers = "localhost:9092";
            /*config.AllowAutoCreateTopics = false;*/
            config.EnableAutoOffsetStore = false;
            config.TopicMetadataRefreshIntervalMs = 5000;
            config.MetadataMaxAgeMs = 5000;
            config.TopicMetadataPropagationMaxMs = 5000;
            config.AutoOffsetReset = AutoOffsetReset.Earliest;
            //
            ConsumerBuilder<string, string> builder = new ConsumerBuilder<string, string>(config);
            Consumer = builder.Build();
            //
            CancellationToken = new CancellationTokenSource();
            _context = context;
        }

        public async Task ConsumeMessage()
        {
            await Task.Factory.StartNew(async () =>
            {
                Consumer.Subscribe(@"^MLC-Topic\d+");
                Debug.WriteLine(@$"Consumer: Start consume");
                while (true)
                {
                    ConsumeResult<string, string> result = Consumer.Consume(CancellationToken.Token);
                    MessageModel message = await JsonUtil.DeserializeAsync<MessageModel>(result.Message.Value);
                    Debug.WriteLine(@$"Consumer:
==========================================
Message: {result.Message.Key} - {result.Message.Value}
Offset: {result.Offset.Value}
Partition: {result.Partition.Value}
Topic: {result.Topic}
Position: {Consumer.Position(result.TopicPartition)}
==========================================");
                    message.MessageId = Convert.ToInt32(result.Offset.Value);
                    if (!await MessageRepository.ExistsAsync(_context, message) && await MessageRepository.InsertAsync(_context, message) != null)
                        Consumer.StoreOffset(result);

                }
            });
        }
    }
}
