import RegistrationInfo from "./registration-info";
import FinancialStatement from "./financial-statement";

export default class Company {
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
      registrationInfo: this.registrationInfo.toDto(),
      financialStatements: this.financialStatements.map(fs => fs.toDto())
    };
  }

  static fromDto({id, name, address, registrationInfo, financialStatements}){
    return new Company(
      id, name, address,
      RegistrationInfo.fromDto(registrationInfo),
      financialStatements.map(fs => FinancialStatement.fromDto(fs))
    );
  }
}
