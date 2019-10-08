import CompaniesRepository from '../../repository/companies-repository';
import { success, failure } from '../../libs/response-lib';
import BackgroundJob from '../../models/background-job';
import BackgroundJobsRepository from '../../repository/background-jobs-repository';

export async function main(event, context){
  try {
    let repository = new CompaniesRepository();
    let jobsRepository = new BackgroundJobsRepository();
    let companyIds = (await repository.getAll()).map(c => c.id);
    for (const companyId of companyIds) {
      let job = new BackgroundJob('refresh-company', { companyId });
      await jobsRepository.save(job);
    }
    return success({ companyIds });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
