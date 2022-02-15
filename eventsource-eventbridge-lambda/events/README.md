# Event Service

This project provisions API Gateway resources, Lambda function(s), and EventBridge resources to provide _Event_ domain functionality.

The Event Service component creates a REST API endpoint to which events are posted. The service sends those events to Amazon EventBridge where they are stored and sent via a bus to various microservices for downstream processing.

## Prerequisites

> **REQUIREMENTS:** NodeJS `lts/fermium (v14.15 or later)`. If you are using `nvm` run `nvm use` to ensure you're using the required Node version.

Run the following command to install the `Yarn` package manager.

```
npm i -g yarn
```

## Install

At a terminal prompt, run the following command to install project dependencies.

```
yarn
```

## Deploy

> **NOTE:** It is assumed that you have sufficient AWS privileges to provision the AWS resources utilized by this project.

This project uses the Serverless framework to provison AWS resources and deploy application components. At a terminal prompt, run the following command to deploy the application to AWS.

```
yarn run deploy
```

> **TIP:** The Serverless Framework logs the API Gateway URL for the `POST /events` endpoint to the console. Save this URL to use when running the experiment.

_Sample output_

```
Deploying jscoe155-eventbridge-lambda to stage dev (us-east-1)

✔ Service deployed to stack jscoe155-eventbridge-lambda-dev (127s)

endpoint: POST - https://11cw2k7rt2.execute-api.us-east-1.amazonaws.com/dev/events
functions:
  createEvent: jscoe155-eventbridge-lambda-dev-createEvent (71 kB)
Done in 129.01s.
```

## Clean up

When the AWS resources are no longer needed, run the following command to remove them.

```
yarn run remove
```

## Related Information
