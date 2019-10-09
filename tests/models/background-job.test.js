import BackgroundJob from '../../models/background-job';
import { Status } from '../../models/background-job';

describe('BackgroundJob', () => {
  describe('.ctor()', () => {
    test('by default initializes the id with an uuid', () => {
      let job = new BackgroundJob('name', {});
      expect(job.id).toBeDefined();
    });

    test('by default initializes the status with Status.PENDING', () => {
      let job = new BackgroundJob('name', {});
      expect(job.status).toBe(Status.PENDING);
    });

    test('correctly initializes the props', () => {
      let job = new BackgroundJob('name', { id: 1 }, 'some-id', 'status');
      expect(job.id).toBe('some-id');
      expect(job.name).toBe('name');
      expect(job.params).toEqual({id: 1});
      expect(job.status).toBe('status');
    });
  });

  describe('#status', () => {
    test('sets a new value', () => {
      let job = new BackgroundJob();
      job.status = Status.RUNNING;
      expect(job.status).toBe(Status.RUNNING);
    });
  });

  describe('#toDto() and .fromDto()', () => {
    test('correctly serializes to and from DTO', () => {
      let job = new BackgroundJob('name', { a: 2, b: 3}, 'some-id', Status.RUNNING);
      let dto = job.toDto();
      let mappedFromDto = BackgroundJob.fromDto(dto);
      expect(mappedFromDto).toBeInstanceOf(BackgroundJob);
      expect(mappedFromDto).toEqual(job);
    });
  });
});
