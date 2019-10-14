import JobProcessor from '../../../background-jobs/processors/job-processor';
import BackgroundJobsRepository from '../../../repository/background-jobs-repository';
import BackgroundJob from '../../../models/background-job';

jest.mock('../../../repository/background-jobs-repository');
jest.mock('../../../models/background-job');

describe(JobProcessor, () => {
  beforeEach(() => {
    BackgroundJob.mockClear();
    BackgroundJobsRepository.mockClear();
  });

  describe('when not implemented by a subclass', () => {
    const processor = new JobProcessor();

    describe('#process()', () => {
      it('throws a not implemented error', async () => {
        const job = new BackgroundJob();
        await expect(processor.process(job)).rejects.toStrictEqual(new Error(
          'Not Implemented'));
      });
    });
  });

  describe('when implemented by a subclass', () => {
    class StubProcessor extends JobProcessor {
      _processJob(job) {
        if (this._error) throw this._error;
        this.processCalledWith = job;
      }

      throwsError(e = new Error()) {
        this._error = e;
        return this;
      }
    }

    describe('#process', () => {
      describe('when _processJob does not throw', () => {
        it('calls markAsRunning on the job', async () => {
          const processor = new StubProcessor();
          const job = new BackgroundJob();
          await processor.process(job);
          expect(BackgroundJob.mock.instances[0].markAsRunning)
            .toHaveBeenCalledTimes(1);
        });

        it('calls markAsDone on the job', async () => {
          const processor = new StubProcessor();
          const job = new BackgroundJob();
          await processor.process(job);
          expect(BackgroundJob.mock.instances[0].markAsDone)
            .toHaveBeenCalledTimes(1);
        });

        it('updates the job twice', async () => {
          const processor = new StubProcessor();
          const job = new BackgroundJob();
          await processor.process(job);
          expect(BackgroundJobsRepository.mock.instances[0].save)
            .toHaveBeenCalledTimes(2);
          expect(BackgroundJobsRepository.mock.instances[0].save)
            .toHaveBeenCalledWith(job);
        });
      });

      describe('when _processJob throws', () => {

        it('calls markAsRunning on the job', async () => {
          const processor = new StubProcessor().throwsError();
          const job = new BackgroundJob();
          await processor.process(job).catch(() => {});
          expect(BackgroundJob.mock.instances[0].markAsRunning)
            .toHaveBeenCalledTimes(1);
        });

        it('calls markAsFailed on the job', async () => {
          const processor = new StubProcessor().throwsError();
          const job = new BackgroundJob();
          await processor.process(job).catch(() => {});
          expect(BackgroundJob.mock.instances[0].markAsFailed)
            .toHaveBeenCalledTimes(1);
        });

        it('updates the job twice', async () => {
          const processor = new StubProcessor().throwsError();
          const job = new BackgroundJob();
          await processor.process(job).catch(() => {});
          expect(BackgroundJobsRepository.mock.instances[0].save)
            .toHaveBeenCalledTimes(2);
          expect(BackgroundJobsRepository.mock.instances[0].save)
            .toHaveBeenCalledWith(job);
        });

        it('rethrows the error', async () => {
          const error = new Error('test');
          const processor = new StubProcessor().throwsError(error);
          const job = new BackgroundJob();
          await expect(processor.process(job)).rejects.toStrictEqual(error);;
        });
      });
    });
  });
});
