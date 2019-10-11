import { main as getJob } from '../../background-jobs/get';
import { success, failure } from '../../libs/response-lib';
import BackgroundJobsRepository from '../../repository/background-jobs-repository';
import BackgroundJob from '../../models/background-job';

const mockJob = new BackgroundJob('some-name', { id : 'suuup'});
const mockRepositoryGet = jest.fn();
const mockParameters = { pathParameters: { id: mockJob.id } };
jest.mock('../../repository/background-jobs-repository', () =>
  jest.fn().mockImplementation(() => {
      return {
        get: mockRepositoryGet
      };
}));

global.console = {
  log: jest.fn()
}

describe('background-mockJobs#get', () => {
  beforeEach(() => {
    BackgroundJobsRepository.mockClear();
    mockRepositoryGet.mockClear();
    mockRepositoryGet.mockResolvedValue(mockJob);
  });

  it('creates a mockJob repository', async () => {
    await getJob(mockParameters);
    expect(BackgroundJobsRepository).toHaveBeenCalledTimes(1);
  });

  it('calls the mockJob repository with pass pathParameters id', async () => {
    await getJob(mockParameters);
    expect(mockRepositoryGet).toHaveBeenCalledWith(mockJob.id);
  });

  it('returns success result when repository returns a mockJob', async () => {
    let result = await getJob(mockParameters);
    expect(result).toStrictEqual(success(mockJob.toDto()));
  });

  it('returns failure result when repository throws', async () => {
    const error = new Error('test');
    mockRepositoryGet.mockRejectedValue(error);
    let result = await getJob(mockParameters);
    expect(result).toEqual(failure({status: false}));
  });

  it('logs the error to the console when repo throws', async () => {
    const error = new Error('some error');
    mockRepositoryGet.mockRejectedValue(error);
    await getJob(mockParameters);
    expect(global.console.log).toHaveBeenCalledWith(error);
  });
});
