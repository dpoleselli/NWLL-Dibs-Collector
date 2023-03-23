resource "aws_scheduler_schedule" "nightly_schedule" {
  name        = "Nightly-DIBS-Crawl"
  description = "Pull DIBS data nightly and save to Google Sheet"

  flexible_time_window {
    mode = "OFF"
  }

  schedule_expression          = "cron(0 2 * * ? *)"
  schedule_expression_timezone = "America/Los_Angeles"

  target {
    arn      = aws_lambda_function.terraform_lambda_func.arn
    role_arn = aws_iam_role.eventbridge_role.arn
  }
}