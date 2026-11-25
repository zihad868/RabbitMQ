const amqp = require('amqplib');


const receivedMessage = async () => {
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        await channel.assertQueue("email-queue", { durable: true });

        console.log("Waiting for messages in email-queue...");

        await channel.consume("email-queue", (message) => {
            if (message !== null) {
                console.log(`Received Message`, message.content.toString());
                channel.ack(message);
            }
        });
    } catch (error) {
        console.log(error);

    }

}

receivedMessage()