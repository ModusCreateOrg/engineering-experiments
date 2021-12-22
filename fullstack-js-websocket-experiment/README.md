# Name

Experiment that shows how to build a Full Stack JS WebSocket application

## Installation

CD into the Backend and Frontend directory and run the code below.

```bash
npm install 
```

## Initial Design

A simple react app was implemented as the frontend, then a backend api was implemented using nodejs and some of her modules.

* The frontend communicates with the backend via a websocket connection.
* Websocket is a stateful protocol that enables full duplex communication between client and server.
* Vertical scalability was a breeze as all we needed to do was to upgrade the memory on the server.
* Horizontal scalability was not feasible with this Initial design.

## Performance and Scalability Issues

1. Horizontal scaling means we have to run more instances of the backend across multiple computing nodes.![Scaling wss for virtual events diagram 2](https://images.ctfassets.net/ee3ypdtck0rk/7mKp5WRyPFllYPPyY2lnd2/8f690804c854a732a9150ee2371c578f/horizontal-vs-vertical-scaling.png_2x.png?w=1670&h=840&q=50&fm=png)
2. We would consider the integration of Redis, which enables you to run multiple Socket.IO instances in different processes or servers, pass events between nodes, and broadcast messages via the Redis Pub/Sub mechanism.![Scaling wss for virtual events diagram 3](https://images.ctfassets.net/ee3ypdtck0rk/41Yxss5ZG6DiVZTKlYzAw0/ddb5363e7e0644448cb9bf22d030854c/basic-pub-sub-system-scaling-websockets_2x.png?w=1320&h=800&q=50&fm=png)
3. Despite its popularity, Socket.IO has its limitations. First of all, it’s a simple solution that consists of a Node.js server and a JavaScript client library for the browser. Socket.IO is essentially just a wrapper around the WebSocket API in browsers. It offers limited additional functionality. Secondly, Socket.IO doesn’t provide strong messaging guarantees (ordering, guaranteed delivery, and exactly-once semantics). If data integrity is important to your use case, you will have to build separate components or mechanisms to ensure it.
4. We will containerize the frontend and the backend and run them in preparation for the horizontal scaling.
5. Next we will decide on a loadbalancer and spin up one in a container.
