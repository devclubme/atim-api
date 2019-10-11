import Company from '../models/company/company';
import BaseRepository from './base-repository';

export default class CompaniesRepository extends BaseRepository {
  constructor(tableName = process.env.companiesTableName){
    super(tableName);
  }

  async getAll(){
    let { Items: dtos} = await this._callDynamoDb('scan');
    return dtos.map(dto => Company.fromDto(dto));
  }

  async save(company){
    let dto = company.toDto();
    await this._callDynamoDb('put', { Item: dto });
  }
}
