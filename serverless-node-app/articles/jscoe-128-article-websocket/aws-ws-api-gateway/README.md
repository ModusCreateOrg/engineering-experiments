## Building a WebSocket server using AWS API Gateway. No more worries about scalability
---
This project was implemented to the production of a blogpost for ModusCreate Blog https://moduscreate.com/insights/blog/, which is about how we can 
create a websocket server to attend a high demand of clients without worring with the scalability.

For the implementation was used Serverless Framework, AWS API Gateway and AWS Lambda.

Prerequisites
```sls plugin install --name serverless-iam-roles-per-function```

Deploy:
-

To deploy this project, you should have the Serverless Framework installed and an AWS Account configured. With all configured and installed, you need just type:
```sls deploy```
