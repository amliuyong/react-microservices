import nats, { Stan } from 'node-nats-streaming';


class NatsWrapper {
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });
    console.log(`nats clientId: ${clientId}, connected to clusterId: ${clusterId}, url: ${url}`)
    return new Promise((resolve, reject) => {
      
      this.client.on('connect', () => {  
        console.log('Connected to NATS');
        resolve(null);
      });
      
      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();  // singleton
