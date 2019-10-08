import Company from '../../models/company/company'
import RegistrationInfo from '../../models/company/registration-info';
import FinancialStatement from '../../models/company/financial-statement';
import Balance from '../../models/company/balance';
import BusinessSector from '../../models/company/business-sector';

describe('Company', () => {
  describe('.ctor()', () => {
    test('correctly initializes the object', () => {
      let id = 12345, name = 'M-Tel', address = 'neka adresa';
      let bs = new BusinessSector(1, 'sector');
      let registrationInfo = { id: 12345 };
      let financialStatements = [ { id: 1, balance: { income: 1, expense: 2 }}];
      let company = new Company(id, name, address, bs, registrationInfo, financialStatements);
      expect(company.id).toBe(id);
      expect(company.name).toBe(name);
      expect(company.address).toBe(address);
      expect(company.businessSector).toBe(bs);
      expect(company.financialStatements).toBe(financialStatements);
      expect(company.registrationInfo).toBe(registrationInfo);
    });

    test('freezes object for modification', () => {
      let company = new Company();
      expect(() => company.id = 123).toThrowError();
      expect(() => company['newProp'] = 'newVal').toThrowError();
    });
  });

  describe('#toDto() and .fromDto()', () => {
    test('map correctly to and from DTO object', () => {
      let company = new Company(12345, 'M-Tel', 'Some address', new BusinessSector(1, 'sec'), new RegistrationInfo(1, Date.now(), 'Sud'), [
        new FinancialStatement(1, 2014, new Balance(150, 50)),
        new FinancialStatement(2, 2015, new Balance(50, 150))
      ]);
      let dto = company.toDto();
      let mappedFromDto = Company.fromDto(dto);
      expect(mappedFromDto).toBeInstanceOf(Company);
      expect(mappedFromDto).toEqual(company);
    });
  });
});
