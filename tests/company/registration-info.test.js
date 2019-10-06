import RegistrationInfo from '../../models/company/registration-info'

describe('RegistrationInfo', () => {
  describe('.ctor()', () => {
    test('initialized the object correctly', () => {
      let id = 1, date = new Date(2014, 4, 4), institution = 'Sud', vatInfo = { id: 5, date: Date.now()}
      let registrationInfo = new RegistrationInfo(id, date, institution, vatInfo);
      expect(registrationInfo.id).toBe(id);
      expect(registrationInfo.date).toBe(date);
      expect(registrationInfo.institution).toBe(institution);
      expect(registrationInfo.vatRegistration).toBe(vatInfo);
    });
    test('freezes the object for modification', () => {
      let registrationInfo = new RegistrationInfo(1);
      expect(() => registrationInfo.id = 10).toThrowError();
      expect(() => registrationInfo['newProp'] = 'newVal').toThrowError();
    });
  });

  describe('#isRegisteredForVat', () => {
    test('returns true if it has VAT information', () => {
      let registrationInfo = new RegistrationInfo(1, Date.now(), 'Sud', { id: 2, date: Date.now()});
      expect(registrationInfo.isRegisteredForVat).toBe(true);
    })

    test('returns false if it does not have VAT information', () => {
      let registrationInfo = new RegistrationInfo(1, Date.now(), 'Sud');
      expect(registrationInfo.isRegisteredForVat).toBe(false);
    });
  });

  describe('#toDto() and .fromDto()', () => {
    describe('when VAT info is present', () => {
      test('maps correctly to and from DTO', () => {
        let registrationInfo = new RegistrationInfo(1, Date.now(), 'Sud', { id: 2, date: Date.now(), area: "PG"});
        let dto = registrationInfo.toDto();
        let mappedFromDto = RegistrationInfo.fromDto(dto);
        expect(mappedFromDto).toBeInstanceOf(RegistrationInfo);
        expect(mappedFromDto).toEqual(registrationInfo);
      });
    });
    describe('when VAT info is not present', () => {
      test('maps correctly to and from DTO', () => {
        let registrationInfo = new RegistrationInfo(1, Date.now(), 'Sud');
        let dto = registrationInfo.toDto();
        let mappedFromDto = RegistrationInfo.fromDto(dto);
        expect(mappedFromDto).toBeInstanceOf(RegistrationInfo);
        expect(mappedFromDto).toEqual(registrationInfo);
      });
    });
  });
});
