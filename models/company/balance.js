export class Balance {
  constructor(income, expense){
    this.income = income;
    this.expense = expense;
    Object.freeze(this);
  }

  get profit(){
    return this.income - this.expense;
  }
}
