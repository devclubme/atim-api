import ProcesorFactory from '../../../background-jobs/processors/processor-factory';
import ProcessorFactory from '../../../background-jobs/processors/processor-factory';
import CompanyRefreshJobProcessor from '../../../background-jobs/processors/company-refresh-job-processor';

describe(ProcessorFactory, () => {
  const factory = new ProcessorFactory();
  describe('#create()', () => {
    it('creates the correct factory for refresh-company', () => {
      expect(factory.create('refresh-company')).toBeInstanceOf(CompanyRefreshJobProcessor);
    });

    it('throws an error when jobName has no factory associated', () => {
      const madeUpJob = 'made-up-test-job-name';
      expect(() => factory.create(madeUpJob)).toThrowError(`Job Processor not registered for ${madeUpJob}`)
    });
  });
});
