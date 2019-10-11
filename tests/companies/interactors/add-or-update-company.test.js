import * as mockTaxisResult from '../../../data/sample-taxis-result.json';
import * as mockCompanyDto from '../../../data/sample-company-dto.json';
import AddOrUpdateCompany from '../../../companies/interactors/add-or-update-company';
import TaxisProxy from '../../../services/taxis-proxy';
import CompaniesRepository from '../../../repository/companies-repository';
import { Company } from '../../../models/company/index.js';

const mockCompanyId = 'some-id-hehe';
const mockGetCompany = jest.fn().mockResolvedValue(mockTaxisResult);
jest.mock('../../../services/taxis-proxy', () => jest.fn().mockImplementation(() => {
  return {
    getCompany: mockGetCompany
  }
}));
jest.mock('../../../repository/companies-repository');

describe(AddOrUpdateCompany, () => {

  beforeEach(() => {
    TaxisProxy.mockClear();
    CompaniesRepository.mockClear();
  });

  describe('.ctor()', () => {
    beforeEach(() => new AddOrUpdateCompany());

    it('creates an instance of TaxisProxy', () => {
      expect(TaxisProxy).toHaveBeenCalledTimes(1);
    });

    it('creates an instance of CompaniesRepository', () => {
      expect(CompaniesRepository).toHaveBeenCalledTimes(1);
    });
  });

  describe('#execute', () => {
    it('calls taxis proxy with the company Id', async () => {
      const addOrUpdateCompany = new AddOrUpdateCompany();
      await addOrUpdateCompany.execute(mockCompanyId);
      expect(mockGetCompany).toHaveBeenCalledWith(mockCompanyId);
    });

    it('saves the mapped company to repository', async () => {
      const addOrUpdateCompany = new AddOrUpdateCompany();
      await addOrUpdateCompany.execute(mockCompanyId);
      const expectedCompany = Company.fromDto(mockCompanyDto);
      expect(CompaniesRepository.mock.instances[0].save).toHaveBeenCalledWith(expectedCompany);
    });
  });
});
