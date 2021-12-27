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
   1. Developers describe **HAProxy** as "*The Reliable, High Performance TCP/HTTP Load Balancer*". HAProxy (High Availability Proxy) is a free, very fast and reliable solution offering high availability, load balancing, and proxying for TCP and HTTP-based applications. On the other hand.
   2. **Traefik** is detailed as "*Load Balancer for Microservices*". Træfɪk is a modern HTTP reverse proxy and load balancer made to deploy microservices with ease. It supports several backends (Docker, Swarm, Mesos/Marathon, Kubernetes, Consul, Etcd, Zookeeper, BoltDB, Rest API, file...) to manage its configuration automatically and dynamically. **NOTE** we will implement this in a different branch.
6. **Socket.io** When deploying multiple Socket.IO servers, there are two things to take care of:

* enabling sticky session, if HTTP long-polling is enabled (which is the default): see [below](https://socket.io/docs/v4/using-multiple-nodes/#enabling-sticky-session)
* using a compatible adapter, see [here](https://socket.io/docs/v4/adapter/)


## Sticky load balancing[#](https://socket.io/docs/v4/using-multiple-nodes/#sticky-load-balancing "Direct link to heading")

If you plan to distribute the load of connections among different processes or machines, you have to make sure that all requests associated with a particular session ID reach the process that originated them.

### Why is sticky-session required[#](https://socket.io/docs/v4/using-multiple-nodes/#why-is-sticky-session-required "Direct link to heading")

This is because the HTTP long-polling transport sends multiple HTTP requests during the lifetime of the Socket.IO session.

In fact, Socket.IO could technically work without sticky sessions, with the following synchronization (in dashed lines):

![Using multiple nodes without sticky sessions](https://socket.io/assets/images/mutiple-nodes-no-sticky-babd7860f217e09eefc2db73e5012f91.png)

While obviously possible to implement, we think that this synchronization process between the Socket.IO servers would result in a big performance hit for your application.

Remarks:

* without enabling sticky-session, you will experience HTTP 400 errors due to "Session ID unknown"
* the WebSocket transport does not have this limitation, since it relies on a single TCP connection for the whole session. Which means that if you disable the HTTP long-polling transport (which is a perfectly valid choice in 2021), you won't need sticky sessions:

```js codeBlock_23N8 thin-scrollbar
const socket = io("https://io.yourhost.com", {  // WARNING: in that case, there is no fallback to long-polling  transports: [ "websocket" ] // or [ "websocket", "polling" ] (the order matters)});
```

Copy

Documentation: [`transports`](https://socket.io/docs/v4/client-options/#transports)

### Enabling sticky-session[#](https://socket.io/docs/v4/using-multiple-nodes/#enabling-sticky-session "Direct link to heading")

To achieve sticky-session, there are two main solutions:

* routing clients based on a cookie (recommended solution)
* routing clients based on their originating address

You will find below some examples with common load-balancing solutions:
