terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket = "poleselli-terraform"
    key    = "terraform-state/nwll-dibs-collector"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}
