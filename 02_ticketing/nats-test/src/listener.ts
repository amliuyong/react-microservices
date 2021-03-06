import nats, {Message} from 'node-nats-streaming';
import {randomBytes} from 'crypto';

console.clear();

const clientId = randomBytes(8).toString('hex');
console.log(`clientId: ${clientId}`)
const stan = nats.connect('ticketing', clientId, {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    stan.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    });

    const options = stan
        .subscriptionOptions()
        .setManualAckMode(true)
        .setAckWait(20000)
        .setDeliverAllAvailable() // use for the very first time, will be ignored for re-connect
        .setDurableName('accounting-service');

    const subscription = stan.subscribe(
        'ticket:created',
        'queue-group-name',
        options
    );

    subscription.on('message', (msg: Message) => {
        const data = msg.getData();
        if (typeof data === 'string') {
            console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
        }
        msg.ack();
    });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
