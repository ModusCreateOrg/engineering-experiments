*Project for exercise serverless frameworks*
==

![project-target](./assets/exercise-serverless.png)

`In this experiment, was used many services from AWS like API Gateway, AWS Lambda, S3, SQS and DynamoDb.`

**This experiment contains two restful apis, one for file upload (respecting the restriction on payload size), 
storing it in an S3 bucket (uncompressed), send an SQS message that will be received by a lambda 
subscribed to it, doing a zip process, and saving the zipped file in another repository (zipped) and another API to list the files.**

**It also contains a websocket endpoint for the purpose of notifying customers when
an uploaded file invented the compression process.**
