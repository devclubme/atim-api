import FinancialStatement from '../../../models/company/financial-statement'
import Balance from "../../../models/company/balance"

describe('FinancialStatement', () => {
  describe('.ctor()', () => {
    test('initializes the object correctly', () => {
      let id = 'S/123/PB';
      let year = 2014;
      let balance = { income: 1, expense: 2 };
      let statement = new FinancialStatement(id, year, balance);
      expect(statement.id).toBe(id);
      expect(statement.year).toBe(year);
      expect(statement.balance).toBe(balance);
    });
    test('freezes object for modification', () => {
      let statement = new FinancialStatement(1, 2014, { income: 1, expense: 2});
      expect(() => statement.id = 5).toThrowError();
      expect(() => statement['newProp'] = 'newVal').toThrowError();
    });
  });

  describe('.toDto() and #fromDto()', () => {
    test('maps to and from DTOs correctly', () => {
      let statement = new FinancialStatement(1, 2014, new Balance(150,50));
      let dto = statement.toDto();
      let mappedFromDto = FinancialStatement.fromDto(dto);
      expect(mappedFromDto).toStrictEqual(statement);
    });
  });

});
