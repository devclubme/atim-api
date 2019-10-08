import BackgroundJob from '../models/background-job';

describe('BackgroundJob', () => {
  describe('.ctor()', () => {
    test('initializes the id with an uuid', () => {
      let job = new BackgroundJob('name', {});
      expect(job.id).toBeDefined();
    });
  })
});
