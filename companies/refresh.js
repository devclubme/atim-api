import { accepted, failure } from '../libs/response-lib';
import BackgroundJob from '../models/background-job';
import BackgroundJobsRepository from '../repository/background-jobs-repository';

export async function main({ pathParameters: { id: companyId } }, context){
  try {
    let job = new BackgroundJob('refresh-company', { companyId });
    let repository = new BackgroundJobsRepository();
    await repository.save(job);
    return accepted(job.toDto());
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
