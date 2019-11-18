#! /bin/bash

npm install -g serverless@1.46.1
serverless deploy --stage $env --package $CODEBUILD_SRC_DIR/target/$env -v -r us-east-1
