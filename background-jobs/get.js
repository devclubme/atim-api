import BackgroundJobsRepository from "../repository/background-jobs-repository";
import { success, failure } from '../libs/response-lib';

export async function main({ pathParameters: { id: jobId } }, context) {
  try {
    let repository = new BackgroundJobsRepository();
    let job = await repository.get(jobId);
    return success(job.toDto());
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
