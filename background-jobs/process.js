import { success, failure } from '../libs/response-lib';
import BackgroundJobsRepository from '../repository/background-jobs-repository';
import ProcessorFactory from './processors/processor-factory';

export async function main({ Records }, context) {
  try {
    let repository = new BackgroundJobsRepository();
    let processorFactory = new ProcessorFactory();
    let jobsProcessed = 0;
    for (const { eventName, dynamodb: { Keys: { id: { S: jobId }} } } of Records) {
      if (eventName == 'INSERT') {
        let job = await repository.get(jobId);
        let processor = processorFactory.create(job.name);
        await processor.process(job);
        jobsProcessed++;
      }
    }
    return success({ jobsProcessed });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
