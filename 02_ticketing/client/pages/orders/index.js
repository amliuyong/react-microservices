const OrderIndex = ({orders}) => {
    const orderList = orders.map(order => {
        return (
            <li key={order.id}>
                {order.ticket.title} - {parseFloat(order.ticket.price).toFixed(2)} - {order.status}
            </li>)
    });

    return (
        <div>
            <h1>Order List</h1>
            <ul>{orderList}</ul>
        </div>
    );
}

OrderIndex.getInitialProps = async (context, client) => {
    const {data} = await client.get('/api/orders')
    console.log("orders:", data)
    return {orders: data};
};

export default OrderIndex;