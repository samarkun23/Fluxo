import { consumer, TOPIC_NAME, producer } from '@repo/kafka/kafka'
import { prismaClient } from '@repo/db/client'
import { parse } from './parser.js';

async function main() {
    await consumer.connect();
    await producer.connect();

    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true })

    await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {

            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString()
            })

            if (!message.value?.toString()) return;
            const parsedValue = JSON.parse(message.value?.toString());
            const zapRunId = parsedValue.zapRunId;

            const stage = parsedValue.stage;

            // finding what is the associated zap to this zaprunId
            const zapRunDetails = await prismaClient.zapRun.findFirst({
                where: {
                    id: zapRunId
                },
                include: {
                    zap: {
                        include: {
                            actions: {
                                include: {
                                    type: true
                                }
                            }
                        }
                    }
                }
            })
            // send query to get the zapId
            // send query to get back the actions associated to this zap Id
            // find the avilable actions 

            const currentAction = zapRunDetails?.zap.actions.find(x => x.shortingOrder === stage);

            if (!currentAction) {
                console.log("action not found");
                return;
            }
            
            const zapRunMetadata = zapRunDetails?.metadata; // {comment: {email: "harkirat@gmail.com"}}

            if (currentAction.type.id === 'email') {
                // send email 
                console.log("sending email")
                const metadata = currentAction.metadata as any;
                const body = parse(metadata?.body , zapRunMetadata); // you just received {comment.amount}
                const to = parse(metadata?.email , zapRunMetadata ) // {comment.email}
                console.log(`sending out email to ${to} body is ${body}`)
            }

            if (currentAction.type.id === 'sol') {
                // sent the sol
                const metadata = currentAction.metadata as any;
                const amout = parse(metadata?.amount, zapRunMetadata); // you just received {comment.amount}
                const address = parse(metadata?.address, zapRunMetadata) // {comment.email}
                console.log(`sending sol ${amout} to  address: ${address}`)
            }

            await new Promise(r => setTimeout(r, 5000));

            // this will push another value to the queue is that i have executed one value let set me another  
            const lastStaged = (zapRunDetails?.zap.actions.length || 1) - 1; // there are 2 stages 
            if (lastStaged !== stage) {
                await producer.send({
                    topic: TOPIC_NAME,
                    messages: [{
                        value: JSON.stringify({
                            stage: stage + 1,
                            zapRunId
                        })
                    }]
                })
            }

            await consumer.commitOffsets([{
                topic: TOPIC_NAME,
                partition: partition,
                offset: (parseInt(message.offset) + 1).toString()
            }])
        },
    })
}

main();