import BackgroundJobsRepository from '../../repository/background-jobs-repository';
import * as dynamoDbLib from '../../libs/dynamodb-lib';
import BackgroundJob from '../../models/background-job';

jest.mock('../../libs/dynamodb-lib');
const mockTableName = 'mock-table-name';

describe(BackgroundJobsRepository, () => {
  process.env.backgroundJobsTableName = mockTableName;
  const repository = new BackgroundJobsRepository();
  const job = new BackgroundJob('some-name', { a: 1, b: 2}, 'some-id', 'pending');

  describe('#get()', () => {
    beforeAll(() => {
      dynamoDbLib.call.mockResolvedValue({ Item: job.toDto()});
    });

    test('correctly calls DynamoDB', async () => {
      await repository.get(job.id);
      expect(dynamoDbLib.call).toHaveBeenCalledWith('get', {
        TableName: mockTableName,
        Key: {
          id: job.id
        }
      });
    });

    test('maps correctly from DTO', async () => {
      let result = await repository.get(job.id);
      expect(result).toStrictEqual(job);
    });
  });

  describe('#save()', () => {
    test('correctly calls DynamoDB', async () => {
      await repository.save(job);
      expect(dynamoDbLib.call).toHaveBeenCalledWith('put', {
        TableName: mockTableName,
        Item: job.toDto()
      });
    });
  });
});
