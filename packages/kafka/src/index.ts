
import { Kafka } from "kafkajs";

export const TOPIC_NAME = "zap-events";
const kafka = new Kafka({
    clientId: "outbox-processor",
    brokers: ['localhost:9092']
})

export const producer = kafka.producer();
export const consumer = kafka.consumer({groupId: 'test-group'});