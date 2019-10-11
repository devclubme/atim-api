import { success, failure } from '../libs/response-lib';
import BackgroundJobsRepository from '../repository/background-jobs-repository';
import ProcessorFactory from './processors/processor-factory';

export async function main({ Records }, context) {
  let jobsProcessed = 0;
  try {
    let repository = new BackgroundJobsRepository();
    let processorFactory = new ProcessorFactory();
    for (const { eventName, dynamodb: { Keys: { id: { S: jobId }} } } of Records) {
      if (eventName != 'INSERT') continue;
      let job = await repository.get(jobId);
      let processor = processorFactory.create(job.name);
      await processor.process(job);
      jobsProcessed++;
    }
    return success({ jobsProcessed });
  } catch (e) {
    console.log(e);
    return failure({ status: false, jobsProcessed });
  }
}
