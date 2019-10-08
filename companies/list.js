import * as dynamoDbLib from "../libs/dynamodb-lib"
import { success, failure } from "../libs/response-lib";
import Company from "../models/company/company";

export async function main(event, context){
  const params = {
    TableName: process.env.companiesTableName
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    return success(result.Items.map(i => Company.fromDto(i)));
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
