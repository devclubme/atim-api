import BackgroundJobsRepository from "../../repository/background-jobs-repository";
import { Status } from '../../models/background-job';

export default class JobProcessor {
  constructor(jobsRepository = new BackgroundJobsRepository()){
    this._repository = jobsRepository;
  }

  async process(job){
    await this._markAsRunning(job);
    try {
      await this._processJob(job);
      await this._markAsDone(job);
    } catch(e){
      this._markAsFailed(job);
      throw e;
    }
  }

  async _processJob(job){
    throw new Error('not implemented');
  }

  async _markAsRunning(job){
    await this._updateJobStatus(job, Status.RUNNING);
  }

  async _markAsDone(job){
    await this._updateJobStatus(job, Status.DONE);
  }

  async _markAsFailed(job){
    await this._updateJobStatus(job, Status.FAILED);
  }

  async _updateJobStatus(job, status){
    job.status = status;
    await this._repository.save(job);
  }
}
