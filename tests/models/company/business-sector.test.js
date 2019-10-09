import BusinessSector from '../../../models/company/business-sector'

describe('BusinessSector', () => {
  describe('.ctor()', () => {
    test('initializes the object correctly', () =>{
      let bs = new BusinessSector(6260, 'Some type');
      expect(bs.code).toBe(6260);
      expect(bs.name).toBe('Some type');
    });

    test('freezes object for modification', () => {
      let bs = new BusinessSector(1, 2);
      expect(() => bs.code = 5).toThrowError();
      expect(() => bs['newProp'] = 'newVal').toThrowError();
    });
  });

  describe('#toDto() and .fromDto()', () => {
    test('map to and from DTO object properly', () => {
      let bs = new BusinessSector(1, 'some sector');
      let dto = bs.toDto();
      let mappedFromDto = BusinessSector.fromDto(dto);
      expect(mappedFromDto).toBeInstanceOf(BusinessSector);
      expect(mappedFromDto).toEqual(bs);
    });
  })
});
