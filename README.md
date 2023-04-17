# NWLL Dibs Collector

DIBS is a volunteer sign up program used to manage umpire assignment by a local Little League that I am a part of. The goal of this project is to automate the exporting of data from DIBS to a format that can be analyzed.

To do that, this app uses a Node.js Lambda function that leverages Puppeteer to download the latest DIBS data from nwllbaseball.com and save the data to a Google Sheet.

## Commands

- `npm start`: run the handler once
  - See the [required environment veriables](#required-environment-variables) below
- `npm run build`: build the app using esbuild into the dist/ folder

### OLD Deployment Method

- `npm run package`: create a zip of the built app
- `npm run deploy`: deploy the app to aws
  - Requires that the environment variable `FUNCTION_NAME` be set
- `npm run build-and-deploy`: builds, packages, and deploys the app

## Terraform Deployment

See [Infra README](./infra/README.md)

## Required Environment Variables

- `DIBS_USERNAME`
- `DIBS_PASSWORD`
- `GOOGLE_PRIVATE_KEY`
- `GOOGLE_SA_EMAIL`
