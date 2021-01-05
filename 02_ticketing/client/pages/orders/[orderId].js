import {useEffect, useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';

const OrderShow = ({order, currentUser}) => {
    const [timeLeft, setTimeLeft] = useState(0);
    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        }
        findTimeLeft();
        const timerId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timerId);
        }
    }, [order]);


    if (timeLeft < 0) {
        return (<div>
            Order Expired
        </div>);
    }

    return (
        <div>
            {timeLeft} seconds until order expires
            <StripeCheckout
                token={(token) =>  console.log(token)}
                // public stripe key
                stripeKey="pk_test_51I6FOIJI6Nuwq6YaL1hTxN2rfajYk1rlPTOcKyhcBK7hmxeMwXJQbsYByGk1xagg0T1EP4lamYemGcZCbUNnbGVZ00H2aA7TnW"
                amount={order.ticket.price * 100}
                email={currentUser.email}
            ></StripeCheckout>

            <div>You can use the credit card in http://stripe.com/docs/testing</div>
            <code>4242424242424242	Visa	Any 3 digits	Any future date</code>
        </div>

    )
};

OrderShow.getInitialProps = async (context, client) => {
    const {orderId} = context.query;
    const {data} = await client.get(`/api/orders/${orderId}`)

    return {order: data};
};

export default OrderShow;