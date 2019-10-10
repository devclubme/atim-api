import CompaniesRepository from '../../repository/companies-repository';
import * as dynamoDbLib from '../../libs/dynamodb-lib';
import {
  Company,
  BusinessSector,
  RegistrationInfo,
  FinancialStatement,
  Balance
} from '../../models/company';

const mockTableName = 'mock-companies-table';
const testCompany = new Company('some-id', 'some-name', 'address', new BusinessSector('CODE', 'Name'), new RegistrationInfo(1, new Date(), 'INST'), [new FinancialStatement(1, 2019, new Balance(50, 150))]);
jest.mock('../../libs/dynamodb-lib');

describe('CompaniesRepository', () => {
  process.env.companiesTableName = mockTableName;
  const repository = new CompaniesRepository();

  describe('#getAll()', () => {
    test('calls DynamoDB lib with correct params', async () => {
      dynamoDbLib.call.mockResolvedValue({ Items: [] });
      await repository.getAll();
      expect(dynamoDbLib.call).toBeCalledWith('scan', { TableName: mockTableName } );
    });

    test('maps from returned DTOs correctly', async () => {
      dynamoDbLib.call.mockResolvedValue({Items: [testCompany.toDto()]});
      let result = await repository.getAll();
      expect(result).toStrictEqual([testCompany]);
    });
  });

  describe('#save()', () => {
    test('calls DynamoDB with the correct params', async () => {
      await repository.save(testCompany);
      expect(dynamoDbLib.call).toBeCalledWith('put', {
        TableName: mockTableName,
        Item: testCompany.toDto()
      });
    });
  });

});
