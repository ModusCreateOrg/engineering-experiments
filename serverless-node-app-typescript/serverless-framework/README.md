Building a serverless architecture using Serverless Framework with TypeScript
==

### Setup for Deployment
Aquire your `aws_access_key_id` and `aws_secret_access_key` from your AWS account by following this [link](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/). Once you have these details then paste them in your `~/.aws/credentials` file like below:

```
[default]
aws_access_key_id=***************
aws_secret_access_key=***************
```

### Deployment
To deploy your project to AWS Lambda cd into `serverless-node-app-typescript/serverless-framework/zipper-file-async`
1. Run `cd serverless-node-app-typescript/serverless-framework/zipper-file-async`.
2. Now run `sls deploy`.

### Invoking function
To invoke a function simply call below sls command.

```
sls invoke --function listZipped --logs
```

### Test Websocket
First you will need to download `wscat` by running below command.

```
npm install -g wscat
```

Now to test websocket simple run below commands.

```
wscat -c wss://0ujtol1kw8.execute-api.us-east-1.amazonaws.com/dev
```

The above endpoint i.e. `wss://0ujtol1kw8.execute-api.us-east-1.amazonaws.com/dev`, you can get when you run `sls deploy` in the output of that successful deployment look for `endpoints` area and simply look for the endpoint that begins with `wss://`.

### Testing uploader function
For uploader function we need [Insomnia](https://insomnia.rest/download). Go ahead and download it if you haven't done it yet. Then open it and paste the endpoint for `uploader` endpoint(which can be found in `sls deploy` successful output under `endpoints` and it should look something like this `POST - https://230x6qexsh.execute-api.us-east-1.amazonaws.com/dev/file/save`). Change the method to `POST` and select `Multipart Form`. And then select an image for a value and then press send. For reference, take a look at below screenshot.

![Insomnia](screenshots/insomnia.png)

### NOTES:
1. While running `sls deploy` I got `Cannot read file node_modules/rxjs/util/isObject.d.ts due to: ENFILE: file table overflow`. This happens due to the limit on file open files on mac. By default, it is set to low. the fix is below:
```
$ echo kern.maxfiles=65536 | sudo tee -a /etc/sysctl.conf
$ echo kern.maxfilesperproc=65536 | sudo tee -a /etc/sysctl.conf
$ sudo sysctl -w kern.maxfiles=65536
$ sudo sysctl -w kern.maxfilesperproc=65536
$ ulimit -n 65536
```

For more details please visit this [link](http://blog.mact.me/2014/10/22/yosemite-upgrade-changes-open-file-limit).

2. While running `sls deploy` I got `Error: EPERM: operation not permitted, unlink .build/node_modules` error too. It is permissions issue with the TypeScriptPlugin.

I fixed it by deleting `.build/` and `.serverless/` folders from the project which worked.

3. After fixing above issues I started getting `The security token included in the request is invalid`.

To fix this you need to have `aws_access_key_id` and `aws_secret_access_key`. To get these items please follow instructions on this [link](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/) under the title `Creating AWS Access Keys`.

After copying `aws_access_key_id` and `aws_secret_access_key` into a temporary place. Put them in `~/.aws/credentials` file like below:

```
[default]
aws_access_key_id=***************
aws_secret_access_key=***************
```

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
