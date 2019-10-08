import uuid from 'uuid/v4';

export const Status = {
  PENDING: 'pending',
  RUNNING: 'running',
  DONE: 'done',
  FAILED: 'failed'
};
Object.freeze(Status);


export default class BackgroundJob {

  constructor(name, params, id = uuid(), status = Status.PENDING){
    this._id = id;
    this._status = status;
    this._name = name;
    this._params = params;
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

  set status(status){
    this._status = status;
  }

  toDto(){
    return {
      id: this.id,
      status: this.status,
      name: this.name,
      params: this.params
    }
  }

  static fromDto({id, status, name, params}){
    return new BackgroundJob(name, params, id, status);
  }
}
