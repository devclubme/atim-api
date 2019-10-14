import BackgroundJob from '../models/background-job';
import BaseRepository from './base-repository';

export default class BackgroundJobsRepository extends BaseRepository {
  constructor(){
    super(process.env.backgroundJobsTableName);
  }

  async get(jobId){
    let { Item: dto} = await this._callDynamoDb('get', { Key: { id: jobId } });
    return BackgroundJob.fromDto(dto);
  }

  async save(job){
    let dto = job.toDto();
    await this._callDynamoDb('put', { Item: dto });
  }
}
