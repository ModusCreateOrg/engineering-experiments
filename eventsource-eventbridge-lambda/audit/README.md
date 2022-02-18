# Audit Service

This project provisions Lambda, DynamoDB, and EventBridge resources to provide _Election Audit_ domain functionality.

The Audit service is comprised of Lambda functions which handle Amazon EventBridge events. The service processes those events, updating the election audit log.

## Prerequisites

> **REQUIREMENTS:** NodeJS `lts/fermium (v14.15 or later)`. If you are using `nvm` run `nvm use` to ensure you're using the required Node version.

If necessary, run the following command to install the `Yarn` package manager.

```
npm i -g yarn
```

If necessary, follow these instructions to install the [AWS CLI (Command Line Interface)][aws-cli].

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

## Clean up

When the AWS resources are no longer needed, run the following command to remove them.

```
yarn run remove
```

## Related Information

[nvm | Node Version Manager](https://github.com/nvm-sh/nvm)  
[Yarn Package Manager](https://yarnpkg.com/)  
[AWS CLI][aws-cli]

[aws-cli]: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html 'Installing or Updating the AWS CLI'
