import * as dynamoDbLib from '../libs/dynamodb-lib';
import BackgroundJob from '../models/background-job';

export default class BackgroundJobsRepository {
  constructor(){
    this._defaultParams = {
      TableName: process.env.backgroundJobsTableName
    };
  }

  async get(jobId){
    let { Item: dto} = await this._callDynamoDb('get', { Key: { id: jobId } });
    return BackgroundJob.fromDto(dto);
  }

  async save(job){
    let dto = job.toDto();
    await this._callDynamoDb('put', { Item: dto });
  }

  _callDynamoDb(operation, params){
    let dynamoDbParams = this._createDynamoParams(params || {});
    return dynamoDbLib.call(operation, dynamoDbParams);
  }

  _createDynamoParams(params){
    return { ...params, ...this._defaultParams };
  }
}
