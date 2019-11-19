#! /bin/bash

npm install -g serverless@1.49.0
echo $CODEBUILD_SRC_DIR
echo $env
serverless deploy --stage $env -v -r us-east-1
