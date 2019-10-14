import CompaniesRepository from '../repository/companies-repository';
import { success, failure } from '../libs/response-lib';
import BackgroundJob from '../models/background-job';
import BackgroundJobsRepository from '../repository/background-jobs-repository';

export async function main(event, context){
  try {
    let repository = new CompaniesRepository();
    let jobsRepository = new BackgroundJobsRepository();

    let jobs = (await repository.getAll())
      .map(({id: companyId}) => new BackgroundJob('refresh-company', { companyId }));

    for (const job of jobs) {
      await jobsRepository.save(job);
    }

    return success({ jobs });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
