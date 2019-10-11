import { main as listCompanies } from '../../companies/list';
import CompaniesRepository from '../../repository/companies-repository';
import { success, failure } from '../../libs/response-lib';

const mockCompanies = [
  { id: 'test-id', name: 'test-name' },
  { id: 'test-id-2', name: 'test-name-2' }
];
const mockCompaniesRepositoryGet = jest.fn();
jest.mock('../../repository/companies-repository', () => jest.fn().mockImplementation(() => {
  return {
    getAll: mockCompaniesRepositoryGet
  }
}));

global.console = {
  log: jest.fn()
}

describe('companies#list', () => {
  beforeEach(() => {
    CompaniesRepository.mockClear();
    mockCompaniesRepositoryGet.mockClear();

    mockCompaniesRepositoryGet.mockResolvedValue(mockCompanies);
  });

  it('creates an instance of CompaniesRepository', async () => {
    await listCompanies();
    expect(CompaniesRepository).toHaveBeenCalledTimes(1);
  });

  it('returns success result with the companies from repo', async () => {
    let result = await listCompanies();
    expect(result).toEqual(success(mockCompanies));
  });

  describe('when there is an error in repository', () => {
    const error = new Error('test');
    beforeEach(() => {
      mockCompaniesRepositoryGet.mockRejectedValue(error);
    });

    it('returns failure result', async () => {
      expect(await listCompanies()).toEqual(failure({status: false}));
    });

    it('logs the error to console.log', async () => {
      await listCompanies();
      expect(global.console.log).toHaveBeenCalledWith(error);
    });
  });

});
