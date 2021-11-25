About this project
==

*This project was built using Serverless Framework, a famous and mature framework for build serverless architecture supporting multiple providers (AWS, GCP, Azure...)*

To run this project you must have serverless framework installed in your machine.
You can more details about install instruction at **https://www.serverless.com/framework/docs/getting-started**.

After install Serverless, you can run npm install to install all dependencies needed, configure your AWS accounts and deploy your functions.

**For all functions below, you can pass a stage using a flag --stage ${your stage}**

**Deploy your functions. Optionally you can pass stage. For default "dev" will be applied, but you can change it updating the default value for stage at serverless.yml file**
```
sls deploy
```
**or you can pass a stage to be deployed**
```
sls deploy --stage test
```
---
**You can invoke your function from your terminal**
````
sls invoke -f listZipped -p ./mocks/list.json
````
---
**You can invoke a function locally.
This runs your code locally by emulating the AWS Lambda environment. Please keep in mind, it's not a 100% perfect emulation, there may be some differences, but it works for the vast majority of users. More info here https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local**
````
sls invoke local -f listZipped -p ./mocks/list.json
````
---
**To show logs of executions at your terminal**
```
sls logs -f listZipped -t 
```
---
**To test websocket, install wscat. After installed run wscat -c wss://${endpoint}**

**Atached to terminal you can type:**
````
{"action": "onMessage", "data": { "place": "modusland"}}
````
---
**Remove the stack from AWS**
```
sls remove
````