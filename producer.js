const  ampq = require('amqplib');
 
const sendMessage = async () => {
    try{
        const connection = await ampq.connect('apmq://localhost');
        const channel =  await connection.createChannel();
        const exchange = "email-exchange";
        const routingKey = "send-email";

        const  mesage = {
            from: "a@example.com",
            to: "b@example.com",
            subject: "Test Email",
            text: "This is a test email."
        }

        await channel.assertExchange(exchange, 'direct', {durable: false});
        await channel.assertQueue("email-queue", {durable: false});

        await channel.bindQueue('email-queue', exchange, routingKey);

        await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(mesage)));
        console.log("Message sent:", mesage);

        setTimeout(() => {
            channel.close();
            connection.close();
        }, 500);
    }catch(err){
        console.error('Error sending message:', err);
    }
}