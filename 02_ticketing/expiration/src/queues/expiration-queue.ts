import Queue from 'bull';
import {ExpirationCompletePublisher} from '../events/publishers/expiration-complete-publisher';
import {natsWrapper} from '../nats-wrapper';

// data in Job
interface Payload {
    orderId: string;
}

// create a redis Queue
const expirationQueue = new Queue<Payload>('order:expiration', {
    redis: {
        host: process.env.REDIS_HOST,
    },
});

// Queue process job
expirationQueue.process(async (job) => {
    console.log("expirationQueue job:", job);
    new ExpirationCompletePublisher(natsWrapper.client).publish({
        orderId: job.data.orderId,
    });
});

export {expirationQueue};
