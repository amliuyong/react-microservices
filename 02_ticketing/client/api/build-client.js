import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on the server

    return axios.create({
      // http://<Service-Name>.<namespace>.svc.cluster.local
      baseURL: 'http://my-release-ingress-nginx-controller.default.svc.cluster.local',
      // pass the cookie, host['ticketing.dev'] as well, otherwise the ingress does not work
      headers: req.headers
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: '/'
    });
  }
};
