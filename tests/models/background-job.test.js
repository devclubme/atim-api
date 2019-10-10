import BackgroundJob from '../../models/background-job';
import { Status } from '../../models/background-job';

describe(BackgroundJob, () => {
  describe('.ctor()', () => {
    it('by default initializes the id with an uuid', () => {
      let job = new BackgroundJob('name', {});
      expect(job.id).toBeDefined();
    });

    it('by default initializes the status with Status.PENDING', () => {
      let job = new BackgroundJob('name', {});
      expect(job.status).toBe(Status.PENDING);
    });

    it('by default initializes timestamps with createdAt time', () => {
      let job = new BackgroundJob('name', {});
      expect(job.timestamps.createdAt).toBeInstanceOf(Date);
    });

    it('correctly initializes the props', () => {
      let job = new BackgroundJob('name', { id: 1 }, 'some-id', 'status', { createdAt: 'BLAH' });
      expect(job.id).toBe('some-id');
      expect(job.name).toBe('name');
      expect(job.params).toEqual({id: 1});
      expect(job.status).toBe('status');
      expect(job.timestamps).toEqual({createdAt: 'BLAH'});
    });
  });

  describe('#markAsRunning()', () => {
    it('updates status to running', () => {
      let job = new BackgroundJob('name', {});
      job.markAsRunning();
      expect(job.status).toBe(Status.RUNNING);
    });

    it('updates timestamps with startedAt', () => {
      let job = new BackgroundJob('name', {});
      job.markAsRunning();
      expect(job.timestamps.startedAt).toBeInstanceOf(Date);
    });
  });

  describe('#markAsDone()', () => {
    it('updates status to done', () => {
      let job = new BackgroundJob();
      job.markAsDone();
      expect(job.status).toBe(Status.DONE);
    });

    it('updates timestamps with finishedAt', () => {
      let job = new BackgroundJob();
      job.markAsDone();
      expect(job.timestamps.finishedAt).toBeInstanceOf(Date);
    });
  });

  describe('#markAsFailed()', () => {
    it('updates status to failed', () => {
      let job = new BackgroundJob();
      job.markAsFailed();
      expect(job.status).toBe(Status.FAILED);
    });

    it('updates timestamps with finishedAt', () => {
      let job = new BackgroundJob();
      job.markAsFailed();
      expect(job.timestamps.finishedAt).toBeInstanceOf(Date);
    });
  });

  describe('#toDto() and .fromDto()', () => {
    it('correctly serializes to and from DTO', () => {
      let job = new BackgroundJob('name', { a: 2, b: 3}, 'some-id', Status.RUNNING);
      let dto = job.toDto();
      let mappedFromDto = BackgroundJob.fromDto(dto);
      expect(mappedFromDto).toBeInstanceOf(BackgroundJob);
      expect(mappedFromDto).toEqual(job);
    });
  });
});
