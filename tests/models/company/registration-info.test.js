import RegistrationInfo from '../../../models/company/registration-info'

describe(RegistrationInfo, () => {
  describe('.ctor()', () => {
    it('initialized the object correctly', () => {
      let id = 1, date = new Date(2014, 4, 4), institution = 'Sud', vatInfo = { id: 5, date: new Date()}
      let registrationInfo = new RegistrationInfo(id, date, institution, vatInfo);
      expect(registrationInfo.id).toBe(id);
      expect(registrationInfo.date).toBe(date);
      expect(registrationInfo.institution).toBe(institution);
      expect(registrationInfo.vatRegistration).toBe(vatInfo);
    });
    it('freezes the object for modification', () => {
      let registrationInfo = new RegistrationInfo(1);
      expect(() => registrationInfo.id = 10).toThrowError();
      expect(() => registrationInfo['newProp'] = 'newVal').toThrowError();
    });
  });

  describe('#isRegisteredForVat', () => {
    it('returns true if it has VAT information', () => {
      let registrationInfo = new RegistrationInfo(1, new Date(), 'Sud', { id: 2, date: new Date()});
      expect(registrationInfo.isRegisteredForVat).toBe(true);
    })

    it('returns false if it does not have VAT information', () => {
      let registrationInfo = new RegistrationInfo(1, new Date(), 'Sud');
      expect(registrationInfo.isRegisteredForVat).toBe(false);
    });
  });

  describe('#toDto() and .fromDto()', () => {
    describe('when VAT info is present', () => {
      it('maps correctly to and from DTO', () => {
        let registrationInfo = new RegistrationInfo(1, new Date(), 'Sud', { id: 2, date: new Date(), area: "PG"});
        let dto = registrationInfo.toDto();
        let mappedFromDto = RegistrationInfo.fromDto(dto);
        expect(mappedFromDto).toStrictEqual(registrationInfo);
      });
    });
    describe('when VAT info is not present', () => {
      it('maps correctly to and from DTO', () => {
        let registrationInfo = new RegistrationInfo(1, new Date(), 'Sud');
        let dto = registrationInfo.toDto();
        let mappedFromDto = RegistrationInfo.fromDto(dto);
        expect(mappedFromDto).toStrictEqual(registrationInfo);
      });
    });
  });
});
