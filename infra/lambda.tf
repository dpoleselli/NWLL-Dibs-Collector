data "archive_file" "zipped_app" {
  type        = "zip"
  source_dir  = "${path.module}/../dist/"
  output_path = "${path.module}/../dist/package.zip"
}

resource "aws_lambda_function" "terraform_lambda_func" {
  filename      = "${path.module}/../dist/package.zip"
  function_name = "NWLL-DIBS-Data-Collector"
  role          = aws_iam_role.lambda_role.arn
  handler       = "index.handler"

  source_code_hash = data.archive_file.zipped_app.output_base64sha256

  runtime = "nodejs16.x"

  environment {
    variables = {
      DIBS_PASSWORD      = "tmp"
      DIBS_USERNAME      = "tmp"
      GOOGLE_PRIVATE_KEY = "tmp"
      GOOGLE_SA_EMAIL    = "tmp"
    }
  }
}