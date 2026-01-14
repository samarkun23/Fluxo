import { prismaClient } from '@repo/db/client'
import { producer, TOPIC_NAME } from '@repo/kafka/kafka'

async function main() {

    await producer.connect();

    while (true) {

        //got entry from db 
        const outbox = await prismaClient.zapRunOutbox.findMany({
            where: {},
            take: 10
        })
        if (outbox.length === 0) {
            await new Promise(res => setTimeout(res, 1000))
            continue
        }

        console.log(outbox)
        //push this on kafka / redis 
        await producer.send({
            topic: TOPIC_NAME,
            messages: outbox.map(o => {
                return {
                    value: JSON.stringify({ zapRunId: o.zapRunId, stage: 0 })
                }
            })
        })

        console.log("received sweeper")
        //delete the entry from db 
        await prismaClient.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: outbox.map(o => o.id)
                }
            }
        })
    }
}

main();