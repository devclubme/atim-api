import { main as processJob } from '../../background-jobs/process';
import { success, failure } from '../../libs/response-lib';
import BackgroundJobsRepository from '../../repository/background-jobs-repository';
import BackgroundJob from '../../models/background-job';
import ProcessorFactory from '../../background-jobs/processors/processor-factory';

const mockJob = new BackgroundJob('some-name', { id : 'suuup'});
const mockRepositoryGet = jest.fn();
const mockNotProcessedJob = new BackgroundJob('not-processed-name', { id: 'not-processed-either'});
const mockParameters = { Records: [
  createDynamoStreamRecord('INSERT', mockJob.id),
  createDynamoStreamRecord('UPDATE', mockNotProcessedJob)
]};
jest.mock('../../repository/background-jobs-repository', () =>
  jest.fn().mockImplementation(() => {
    return {
      get: mockRepositoryGet
    };
}));

const mockProcessor = {
  process: jest.fn()
};

const mockProcessorFactoryCreate = jest.fn().mockImplementation(() => mockProcessor);
jest.mock('../../background-jobs/processors/processor-factory', () =>
  jest.fn().mockImplementation(() => {
    return {
      create: mockProcessorFactoryCreate
    };
  })
);



global.console = {
  log: jest.fn(),
}

describe('background-jobs#process', () => {

  beforeEach(() => {
    BackgroundJobsRepository.mockClear();
    ProcessorFactory.mockClear();
    mockRepositoryGet.mockClear();
    mockProcessorFactoryCreate.mockClear();
    mockProcessor.process.mockClear();

    mockProcessor.process = jest.fn();

    mockRepositoryGet.mockImplementation(id => {
      if(id == mockJob.id) return mockJob;
      if(id == mockNotProcessedJob.id) return mockNotProcessedJob;
    });
  });

  it('creates an instance of jobs repository', async () => {
    await processJob(mockParameters);
    expect(BackgroundJobsRepository).toHaveBeenCalledTimes(1);
  });

  it('calls the job repository to get only the INSERTed records', async () => {
    await processJob(mockParameters);
    expect(mockRepositoryGet).toHaveBeenCalledWith(mockJob.id);
    expect(mockRepositoryGet).not.toHaveBeenCalledWith(mockNotProcessedJob.id);
  });

  it('creates an instance of processor factory', async () => {
    await processJob(mockParameters);
    expect(ProcessorFactory).toHaveBeenCalledTimes(1);
  });

  it('calls processor factory create only with the INSERTed jobs names', async () => {
    await processJob(mockParameters);
    expect(mockProcessorFactoryCreate).toHaveBeenCalledWith(mockJob.name);
    expect(mockProcessorFactoryCreate).not.toHaveBeenCalledWith(mockNotProcessedJob.name);
  });

  it('calls the created processor with the INSERTed jobs from repository', async () => {
    await processJob(mockParameters);
    expect(mockProcessor.process).toHaveBeenCalledWith(mockJob);
    expect(mockProcessor.process).not.toHaveBeenCalledWith(mockNotProcessedJob);
  });

  it('returns correct success result', async () => {
    let result = await processJob(mockParameters);
    expect(result).toEqual(success({jobsProcessed: 1 }));
  });

  describe('when error is thrown', () => {
    const error = new Error('test');
    beforeEach(() => {
      mockProcessor.process.mockRejectedValue(error);
    });

    it('logs error when error is thrown', async () => {
      await processJob(mockParameters);
      expect(global.console.log).toHaveBeenCalledWith(error);
    });

    it('returns correct failure result when error is thrown', async () => {
      let result = await processJob(mockParameters);
      expect(result).toEqual(failure({status: false, jobsProcessed: 0}));
    });
  });
});



function createDynamoStreamRecord(eventName, jobId){
  return { eventName, dynamodb: { Keys: { id: { S: jobId }} } };
}
