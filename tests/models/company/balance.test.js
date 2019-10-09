import Balance from "../../../models/company/balance"

describe('Balance', () => {

  describe('.ctor()', () => {
    test('initializes the object correctly', () => {
      let income = 100;
      let expense = 50;
      let balance = new Balance(income, expense);
      expect(balance.income).toBe(income);
      expect(balance.expense).toBe(expense);
    });

    test('freezes the object for modification', () => {
      let balance = new Balance(100, 100);
      expect(() => balance.income = -100).toThrowError();
      expect(() => balance['newProp'] = 'newVal').toThrowError();
    });
  });

  describe('#profit', () => {
    test('computes the correct profit value', () => {
      var balance = new Balance(100, 50);
      expect(balance.profit).toBe(50);
    });

    test('computes the correct loss value', () => {
      var balance = new Balance(50, 100);
      expect(balance.profit).toBe(-50);
    });
  });
});
