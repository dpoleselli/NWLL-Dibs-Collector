# Terraform Infrastructure

This project is configured to deploy the resources necessary for an automated DIBS data export.

## Resources

- Node.js Lambda function
  - Lambda Execution Role
  - Lambda Execution Policy
- Eventbridge Schedule (nightly at 2 am PST)
  - Schedule Execution Role
  - Schedule Execution Policy

## Variables

| name               | type   | sensitive |
| ------------------ | ------ | --------- |
| dibs_password      | string | true      |
| dibs_username      | string | true      |
| google_private_key | string | true      |
| google_sa_email    | string | true      |
