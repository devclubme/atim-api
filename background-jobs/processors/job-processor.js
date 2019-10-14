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
    throw new Error('Not Implemented');
  }

  async _markAsRunning(job){
    job.markAsRunning();
    await this._updateJob(job);
  }

  async _markAsDone(job){
    job.markAsDone();
    await this._updateJob(job);
  }

  async _markAsFailed(job){
    job.markAsFailed();
    await this._updateJob(job);
  }

  async _updateJob(job){
    await this._repository.save(job);
  }
}
