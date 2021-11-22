TODO
--

Done - Change Fn::Join for Fn::Sub (gain readability)

Done - Break configs into files and just import them into serverless.yml;

Done - Remove wildcards of policies about resources, specifying which resource should be given that permission;

Doing - Use `serverless-iam-roles-per-function` for create one role per function, applying the principle of least priviliged access.

ReadMore about hash x range fields dynamoDB;
Packaging and deploy functions isolated on of another;
Add webpack to reduce size of bundle and increase the cold start;

//Annotations
To show logs of executions at your terminal
sls logs --stage=test -f zipper -t 

Rollback a service to a specific deployment.
Also is capable to roolback a specific function to a version.
Note: You can only rollback a function which was previously deployed through serverless deploy. Functions are not versioned when running serverless deploy function.
serverless rollback --timestamp timestamp

Remove the stack from AWS
serverless remove --stage dev --region us-east-1

Install a plugin. May be specified a specific version adding @{version}
on the final of plugin name (serverless-webpack@1.0.0).
serverless plugin install --name serverless-webpack

Simulate an event from aws services:
This can be useful to test functions that react
to the events from AWS Services
serverless generate-event --type aws:sqs

DynamoDB is aligned with the values of Serverless applications: automatic scaling according to your application load, pay-per-what-you-use pricing, easy to get started with, and no servers to manage. This makes DynamoDB a very popular choice for Serverless applications running in AWS.