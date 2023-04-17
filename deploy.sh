#! usr/bin/bash

if [ -z "$FUNCTION_NAME" ]; then
  echo "Please set the FUNCTION_NAME environment variable"
  exit 1
else
    aws lambda update-function-code \
        --function-name $FUNCTION_NAME \
        --zip-file fileb://dist/package.zip
fi
