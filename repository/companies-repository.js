import * as dynamoDbLib from '../libs/dynamodb-lib';
import Company from '../models/company/company';

export default class CompanyRepository {
  constructor(){
    this._defaultParams = {
      TableName: process.env.companiesTableName
    };
  }

  async getAll(){
    let { Items: dtos} = await this._callDynamoDb('scan');
    return dtos.map(dto => Company.fromDto(dto));
  }

  async save(company){
    let dto = company.toDto();
    await this._callDynamoDb('put', { Item: dto });
  }

  _callDynamoDb(operation, params){
    let dynamoDbParams = this._createDynamoParams(params || {});
    return dynamoDbLib.call(operation, dynamoDbParams);
  }

  _createDynamoParams(params){
    return Object.assign(params, this._defaultParams);
  }
}
