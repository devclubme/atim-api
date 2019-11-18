#! /bin/bash

npm install -g serverless@1.49.0
npm install --silent --no-progress
serverless deploy --stage $env --package $CODEBUILD_SRC_DIR/target/$env -v -r us-east-1
