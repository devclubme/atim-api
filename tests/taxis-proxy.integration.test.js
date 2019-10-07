import {
  TaxisProxy
} from '../services/taxis-proxy'

describe('TaxisProxy', () => {
  describe('.ctor()', () => {
    test('throws an error when taxis proxy URL is null', () => {
      expect(() => new TaxisProxy()).toThrow();
    });

    test('by default uses value from process.env for taxis URL', () => {
      process.env.taxisServiceEndpoint = 'test'
      let proxy = new TaxisProxy();
      expect(proxy._taxisServiceEndpoint).toBe('test');
    });
  });

  describe('.getCompany()', () => {
    test('is able to retrieve data', async () => {
      let proxy = new TaxisProxy('https://0leinecija.execute-api.us-east-1.amazonaws.com/prod/graphql');
      jest.setTimeout(10000);
      let result = await proxy.getCompany("02655284");
      expect(result).toBeDefined();
      expect(result.companyName).toBe('DRUŠTVO ZA TELEKOMUNIKACIJE " MTEL " D.O.O. PODGORICA');
    });
  });
});
