import BackgroundJob from '../../../models/background-job';
import CompanyRefreshJobProcessor from "../../../background-jobs/processors/company-refresh-job-processor";
import AddOrUpdateCompany from '../../../companies/interactors/add-or-update-company';

jest.mock('../../../repository/background-jobs-repository');
jest.mock('../../../companies/interactors/add-or-update-company');

describe(CompanyRefreshJobProcessor, () => {
  const companyId = 'some-company-id';
  const processor = new CompanyRefreshJobProcessor();
  const job = new BackgroundJob('refresh-company', { companyId });
  describe('#process()', () => {
    it('creates an AddOrUpdateCompany interactor correctly', async () => {
      await processor.process(job);
      expect(AddOrUpdateCompany).toHaveBeenCalledTimes(1);
    });

    it('calls execute on the interactor with the job params companyId', async () => {
      await processor.process(job);
      expect(AddOrUpdateCompany.mock.instances[0].execute).toHaveBeenLastCalledWith(companyId);
    });
  });
});
