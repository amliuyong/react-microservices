import Link from "next/link";

const LandingPage = ({currentUser, tickets}) => {
    const ticketList = tickets.map(ticket => {
        return (
            <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td>
                    <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
                        <a>View</a>
                    </Link>
                </td>

            </tr>
        );
    });

    return (
        <div>
            <h1>Tickets</h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Link</th>
                </tr>
                </thead>
                <tbody>
                {ticketList}
                </tbody>
            </table>
        </div>
    );
};

// below function can be run in server side or client
LandingPage.getInitialProps = async (context, client, currentUser) => {
    console.log('LANDING PAGE!');
    const {data} = await client.get('/api/tickets');
    return {tickets: data};
};

//
// LandingPage.getInitialProps = async ({ req }) => {
//   if (typeof window === 'undefined') {
//     // we are on the server!
//     // requests should be made to http://ingress-nginx.ingress-nginx...laksdjfk
//     const { data } = await axios.get(
//         'http://ingress-nginx.ingress-nginx.svc.cluster.local/api/users/currentuser',
//         {
//           headers: req.headers
//         }
//     );
//
//     return data;
//   } else {
//     // we are on the browser!
//     // requests can be made with a base url of ''
//     const { data } = await axios.get('/api/users/currentuser');
//
//     return data;
//   }
//   return {};
// };


export default LandingPage;
