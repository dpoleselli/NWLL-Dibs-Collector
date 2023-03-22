resource "aws_iam_role" "lambda_role" {
  name               = "DIBS-Collector-Role"
  assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
    EOF

  tags = {
    Terraform = "true"
  }
}

resource "aws_iam_policy" "iam_policy_for_lambda" {
  name        = "DIBS-collector-policy"
  path        = "/"
  description = "Permissions needed by the DIBS collector"
  policy      = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "arn:aws:logs:us-east-1:056961530812:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:us-east-1:056961530812:log-group:/aws/lambda/NWLL-DIBS-Collector:*"
            ]
        }
    ]
}
    EOF

  tags = {
    Terraform = "true"
  }
}

resource "aws_iam_role_policy_attachment" "attach_iam_policy_to_iam_role" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.iam_policy_for_lambda.arn
}