import RegistrationInfo from "./registration-info";
import FinancialStatement from "./financial-statement";
import BusinessSector from "./business-sector";

export default class Company {
  constructor(id, name, address, businessSector, registrationInfo, financialStatements){
    this.id = id;
    this.name = name;
    this.address = address;
    this.businessSector = businessSector;
    this.registrationInfo = registrationInfo;
    this.financialStatements = financialStatements;
    Object.freeze(this);
  }

  toDto(){
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      businessSector: this.businessSector.toDto(),
      registrationInfo: this.registrationInfo.toDto(),
      financialStatements: this.financialStatements.map(fs => fs.toDto())
    };
  }

  static fromDto({id, name, address, businessSector, registrationInfo, financialStatements}){
    return new Company(
      id, name, address,
      BusinessSector.fromDto(businessSector),
      RegistrationInfo.fromDto(registrationInfo),
      financialStatements.map(fs => FinancialStatement.fromDto(fs))
    );
  }
}
