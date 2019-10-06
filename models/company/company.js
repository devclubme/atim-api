export class Company {
  constructor(id, name, address, registrationInfo, financialStatements){
    this.id = id;
    this.name = name;
    this.address = address;
    this.registrationInfo = registrationInfo;
    this.financialStatements = financialStatements;
    Object.freeze(this);
  }

  toDto(){
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      registrationInfo: this.registrationInfo,
      financialStatements: this.financialStatements
    };
  }

  static fromDto({id, name, address, registrationInfo, financialStatements}){
    return new Company(id, name, address, registrationInfo, financialStatements);
  }
}
