import { prisma } from '@repo/db/client'
import { producer, TOPIC_NAME } from '@repo/kafka/kafka'

async function main() {

    for (let i = 0; true; i++) {
        //got entry from db 
        const outbox = await prisma.zapRunOutbox.findMany({
            where: {},
            take: 10
        })

        //push this on kafka / redis 
        producer.send({
            topic: TOPIC_NAME,
            messages: outbox.map(o => {
                return{
                    value: o.zapRunId
                }
            })
        })

        //delete the entry from db 
        await prisma.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: outbox.map(o => o.id)
                }
            }
        })
    }
}

main();