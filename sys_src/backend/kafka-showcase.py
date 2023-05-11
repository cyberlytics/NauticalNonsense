from kafka.admin import KafkaAdminClient, NewTopic
from kafka import KafkaProducer, KafkaConsumer
from kafka.errors import TopicAlreadyExistsError

admin_client = KafkaAdminClient(bootstrap_servers="localhost:9092", client_id="test2")

try:
    topic_list = []
    topic_list.append(NewTopic(name="test", num_partitions=1, replication_factor=1))
    admin_client.create_topics(new_topics=topic_list, validate_only=False)
except TopicAlreadyExistsError:
    print("Topic already exists")

producer = KafkaProducer(bootstrap_servers="localhost:9092")
producer.send("test", b"Hello, World!")

consumer = KafkaConsumer("test", auto_offset_reset="earliest")
for msg in consumer:
    print(msg.value)
