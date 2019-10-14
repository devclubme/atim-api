import * as dynamoDbLib from '../libs/dynamodb-lib';

export default class BaseRepository {
  constructor(tableName, dynamolib = dynamoDbLib){
    this._defaultParams = {
      TableName: tableName
    };
    this._dynamoLib = dynamolib;
  }

  _callDynamoDb(operation, params = {}){
    let dynamoDbParams = { ...this._defaultParams, ...params};
    return this._dynamoLib.call(operation, dynamoDbParams);
  }
}
