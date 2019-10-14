import { main as refreshAllCompanies } from '../../companies/refresh-all-companies';
import CompaniesRepository from '../../repository/companies-repository';
import BackgroundJob from '../../models/background-job';
import BackgroundJobsRepository from '../../repository/background-jobs-repository';
import { success, failure } from '../../libs/response-lib';

const mockCompanies = [
  { id: 'test-id' },
  { id: 'test-id-2' }
];
const mockCompaniesRepositoryGet = jest.fn();
jest.mock('../../repository/companies-repository', () => jest.fn().mockImplementation(() => {
  return {
    getAll: mockCompaniesRepositoryGet
  }
}));
jest.mock('../../models/background-job');
jest.mock('../../repository/background-jobs-repository');

global.console = {
  log: jest.fn()
}

describe('companies#refreshAllCompanies', () => {

  beforeEach(() => {
    BackgroundJob.mockClear();
    BackgroundJobsRepository.mockClear();
    CompaniesRepository.mockClear();
    mockCompaniesRepositoryGet.mockClear();

    mockCompaniesRepositoryGet.mockResolvedValue(mockCompanies);
  });

  it('creates an instance of CompaniesRepository', async () => {
    await refreshAllCompanies();
    expect(CompaniesRepository).toHaveBeenCalledTimes(1);
  });

  it('creates a background job for each company returned by companies repo', async () => {
    await refreshAllCompanies();
    mockCompanies.forEach(({id: companyId}) =>
      expect(BackgroundJob).toHaveBeenCalledWith('refresh-company', { companyId })
    );
  });

  it('creates an instance of BackgroundJobsRepository', async () => {
    await refreshAllCompanies();
    expect(BackgroundJobsRepository).toHaveBeenCalledTimes(1);
  });

  it('calls jobs repository save for each background job created', async () => {
    await refreshAllCompanies();
    BackgroundJob.mock.instances.forEach(job =>
      expect(BackgroundJobsRepository.mock.instances[0].save).toHaveBeenCalledWith(job)
    );
  });

  it('returns a correct success result', async () => {
    let result = await refreshAllCompanies();
    expect(result).toEqual(success({
      jobs: BackgroundJob.mock.instances
    }));
  });

  describe('when an error is thrown', () => {
    const error = new Error('test');
    beforeEach(() => {
      mockCompaniesRepositoryGet.mockRejectedValue(error);
    });

    it('returns failure result', async () => {
      expect(await refreshAllCompanies()).toEqual(failure({status: false}));
    });

    it('logs the error to console.log', async () => {
      await refreshAllCompanies();
      expect(global.console.log).toHaveBeenCalledWith(error);
    });
  });
});
