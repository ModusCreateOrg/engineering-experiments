# Experiment: Event Sourcing Pattern with Amazon EventBridge and Lambda

This project provides an example of the _Event Sourcing_ architectural pattern using Amazon EventBridge as the event source and AWS Lambda functions as event processors.

## Install

Use NPM or Yarn to install the project dependencies.

> **REQUIREMENTS:** NodeJS `lts/fermium (v14.15 or later)`. If you are using `nvm` run `nvm use` to ensure you're using the required Node version.

### With NPM

```
% npm i
```

### With Yarn

```
% yarn
```

## Deploy

> **NOTE:** It is assumed that you have sufficient AWS privileges to provision the AWS resources utilized by this project.

This project uses the Serverless framework to provison AWS resources and deploy application components. Use your preferred package manager to deploy the application to AWS.

### With NPM

```
% npx sls deploy
```

### With Yarn

```
% yarn sls deploy
```

> **TIP:** The Serverless Framework logs the API Gateway URL for the `POST /events` endpoint to the console. Save this URL to use when running the experiment.

_Sample output_

```
Deploying jscoe155-eventbridge-lambda to stage dev (us-east-1)

✔ Service deployed to stack jscoe155-eventbridge-lambda-dev (127s)

endpoint: POST - https://11cw2k7rt2.execute-api.us-east-1.amazonaws.com/dev/events
functions:
  createEvent: jscoe155-eventbridge-lambda-dev-createEvent (71 kB)
  processEvent: jscoe155-eventbridge-lambda-dev-processEvent (71 kB)
Done in 129.01s.
```

## Clean up

When the AWS resources are no longer needed, remove them by running the following command.

### With NPM

```
% npx sls remove
```

### With Yarn

```
% yarn sls remove
```

## Run

To demonstrate the event sourcing pattern, events are submitted to an `/events` API Gateway endpoint via HTTP POST.

If you noted the `/events` URL when you deployed this project to AWS, proceed to the next step.

If you need to discover the URL for the endpoint, run one of the following commands:

```
% npx sls info

OR

% yarn sls info
```

### Create Event

To create an event, you send a HTTP POST requst to the `/events` endpoint. You may use an API client such as PostMan, or run the following command at a terminal prompt:

```
% curl --request POST \
       --header 'Content-Type: application/json' \
       --data-raw '{"type":"Ballot Submitted","detail":{"ballotId":"B000001","voterId":"V000001","votes":[{"electionId":"E000001","candidateId":"C000001"},{"electionId":"E000002","candidateId":"C000002"}]}}' \
       --verbose \
       {your-gateway-endpoint-url}
```

## Related Information
