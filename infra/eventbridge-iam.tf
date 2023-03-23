resource "aws_iam_role" "eventbridge_role" {
  name               = "DIBS-Eventbridge-Role"
  assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "scheduler.amazonaws.com"
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

resource "aws_iam_policy" "iam_policy_for_eventbridge" {
  name        = "DIBS-Eventbridge-Policy"
  path        = "/"
  description = "Permissions needed by the DIBS Eventbridge Schedule"
  policy      = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "lambda:InvokeFunction"
            ],
            "Resource": [
                "${aws_lambda_function.terraform_lambda_func.arn}"
            ]
        }
    ]
}
    EOF

  tags = {
    Terraform = "true"
  }
}

resource "aws_iam_role_policy_attachment" "attach_eventbridge_iam_policy_to_iam_role" {
  role       = aws_iam_role.eventbridge_role.name
  policy_arn = aws_iam_policy.iam_policy_for_eventbridge.arn
}