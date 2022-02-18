Building a serverless architecture using Serverless Framework
==

Configuration
-
The entire documentation can be found here: **https://www.serverless.com/framework/docs**

First of all, you must run ```npm i -g serverless``` to install Serverless Framework

After that, we can run `serverless`, and follow the cli wizard to completed the configuration of your application

For work with Serverless Framework, you can choose between **serverless** or **sls** keywords.

**Deploy your functions. Optionally you can pass stage. For default "dev" will be applied, but you can change it updating the default value for stage at serverless.yml file**
```
sls deploy --stage test
```
---
**Remove the stack from AWS**
```
serverless remove --stage dev --region us-east-1
````
**To show logs of executions at your terminal**
```
sls logs --stage=test -f zipper -t 
```
---
**Rollback a service to a specific deployment.
Also is capable to roolback a specific function to a version.
Note: You can only rollback a function which was previously deployed through serverless deploy. Functions are not versioned when running serverless deploy function.**
```
serverless rollback --timestamp timestamp
```
---
**Install a plugin. May be specified a specific version adding @{version}
on the final of plugin name (serverless-webpack@1.0.0).**
````
serverless plugin install --name serverless-webpack
````
---
**Simulate an event from aws services:
This can be useful to test functions that react
to the events from AWS Services**
````
serverless generate-event --type aws:sqs
````
---
To test websocket, install wscat.
==
Run wscat -c wss://${endpoint}
Atached to terminal you can type: 
````
{"action": "onMessage", "data": { "nome": "rafa"}}
````