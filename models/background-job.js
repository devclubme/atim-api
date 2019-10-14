import uuid from 'uuid/v4';

export const Status = {
  PENDING: 'pending',
  RUNNING: 'running',
  DONE: 'done',
  FAILED: 'failed'
};
Object.freeze(Status);


export default class BackgroundJob {

  constructor(name, params, id = uuid(), status = Status.PENDING, timestamps = { createdAt: new Date()}){
    this._id = id;
    this._status = status;
    this._name = name;
    this._params = params;
    this._timestamps = timestamps;
  }

  get id(){
    return this._id;
  }

  get status(){
    return this._status;
  }

  get name(){
    return this._name;
  }

  get params(){
    return this._params;
  }

  get status(){
    return this._status;
  }

  get timestamps(){
    return this._timestamps;
  }

  markAsRunning(){
    this._status = Status.RUNNING;
    this._timestamps.startedAt = new Date();
  }

  markAsDone(){
    this._status = Status.DONE;
    this._timestamps.finishedAt = new Date();
  }

  markAsFailed(){
    this._status = Status.FAILED;
    this._timestamps.finishedAt = new Date();
  }

  toDto(){
    let timestampsDto = {};
    for (const key in this.timestamps) {
      if (this.timestamps.hasOwnProperty(key)) {
        const date = this.timestamps[key];
        timestampsDto[key] = date.toISOString();
      }
    }
    return {
      id: this.id,
      status: this.status,
      name: this.name,
      params: this.params,
      timestamps: timestampsDto
    }
  }

  static fromDto({id, status, name, params, timestamps}){
    let mappedTimestamps = {};
    for (const key in timestamps) {
      if (timestamps.hasOwnProperty(key)) {
        const dateString = timestamps[key];
        mappedTimestamps[key] = new Date(dateString);
      }
    }
    return new BackgroundJob(name, params, id, status, mappedTimestamps);
  }
}
