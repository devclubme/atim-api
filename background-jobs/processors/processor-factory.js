import CompanyRefreshJobProcessor from "./company-refresh-job-processor";

export default class ProcessorFactory {
  constructor(){
    this._jobProcessors = {
      'refresh-company': new CompanyRefreshJobProcessor()
    }
  }

  create(jobName){
    if(!this._jobProcessors[jobName]) throw new Error(`Job Processor not registered for ${jobName}`);
    return this._jobProcessors[jobName];
  }
}
