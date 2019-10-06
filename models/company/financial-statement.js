import Balance from "./balance";

export class FinancialStatement {
  constructor(id, year, balance){
    this.id = id;
    this.year = year;
    this.balance = balance;
    Object.freeze(this);
  }

  toDto(){
    return {
      id: this.id,
      year: this.year,
      income: this.balance.income,
      expense: this.balance.expense
    };
  }

  static fromDto({ id, year, expense, income }){
    return new FinancialStatement(id, year, new Balance(income, expense));
  }
}
