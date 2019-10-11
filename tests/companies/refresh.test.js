import { main as refreshCompany } from '../../companies/refresh';

import { accepted, failure } from '../../libs/response-lib';

import BackgroundJob from '../../models/background-job';
import BackgroundJobsRepository from '../../repository/background-jobs-repository';

const mockCompanyId = 'some-test-id';
const mockParameters = { pathParameters: {id: mockCompanyId } };

jest.mock('../../models/background-job');
const mockRepoSave = jest.fn();
jest.mock('../../repository/background-jobs-repository', () => {
  return jest.fn().mockImplementation(() => {
    return {
      save: mockRepoSave
    };
  });
});

global.console = {
  log: jest.fn()
}


describe('companies#refresh', () => {

  beforeEach(() => {
    BackgroundJob.mockClear();
    BackgroundJobsRepository.mockClear();
  });

  it('creates an instance of BackgroundJobsRepository', async () => {
    await refreshCompany(mockParameters);
    expect(BackgroundJobsRepository).toHaveBeenCalledTimes(1);
  });

  it('creates a background job with correct params', async () => {
    await refreshCompany(mockParameters);
    expect(BackgroundJob).toHaveBeenCalledWith('refresh-company', {companyId: mockCompanyId});
  });

  it('saves the background job to the repo', async () => {
    await refreshCompany(mockParameters);
    expect(mockRepoSave).toHaveBeenCalledWith(BackgroundJob.mock.instances[0]);
  });

  it('returns the correct accepted result', async () => {
    let result = await refreshCompany(mockParameters);
    expect(result).toEqual(accepted({
      jobId: BackgroundJob.mock.instances[0].id
    }));
  });

  describe('when error is thrown', () => {
    const error = new Error('test');
    beforeEach(() => {
      mockRepoSave.mockRejectedValue(error);
    });

    it('returns failure result', async () => {
      expect(await refreshCompany(mockParameters)).toEqual(failure({status: false }));
    });

    it('logs error to console.log', async () => {
      await refreshCompany(mockParameters);
      expect(global.console.log).toHaveBeenCalledWith(error);
    });
  });

});
