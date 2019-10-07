import TaxisProxy from '../../services/taxis-proxy';
import CompaniesRepository from '../../repository/companies-repository';
import Company from '../../models/company/company';
import BusinessSector from '../../models/company/business-sector';
import RegistrationInfo from '../../models/company/registration-info';
import FinancialStatement from '../../models/company/financial-statement';
import Balance from '../../models/company/balance';

export default class AddOrUpdateCompany {
  constructor(taxisProxy = new TaxisProxy(), repository = new CompaniesRepository()){
    this._taxisProxy = taxisProxy;
    this._repository = repository;
  }

  async execute(companyId){
    let taxisResult = await this._taxisProxy.getCompany(companyId);
    let company = this._mapToCompanyModel(taxisResult);
    console.log(company);
    await this._repository.save(company);
  }

  _mapToCompanyModel(taxisResult){
    return new Company(
      taxisResult.companyId,
      taxisResult.companyName,
      taxisResult.companyAddress,
      new BusinessSector(taxisResult.businessSectorCode, taxisResult.businessSectorName),
      this._getRegistrationInfo(taxisResult),
      taxisResult.financialStatements.map(fs => this._mapFinancialStatement(fs))
    );
  }

  _getRegistrationInfo(taxisResult){
    let vatInfo = taxisResult.companyRegisteredForVat === 'Da'
      ? {
        id: taxisResult.companyVatRegistrationId,
        date: this._parseTaxisDate(taxisResult.companyVatRegistrationDate),
        area: taxisResult.taxArea
      } : undefined;
    return new RegistrationInfo(
      taxisResult.companyRegistrationId,
      this._parseTaxisDate(taxisResult.companyRegistrationDate),
      taxisResult.companyRegistrationInstitution,
      vatInfo)
  }

  _mapFinancialStatement(taxisFinancialStatement){
    return new FinancialStatement(
      taxisFinancialStatement.statementId,
      taxisFinancialStatement.year,
      new Balance(taxisFinancialStatement.balance.income || 0, taxisFinancialStatement.balance.expense || 0));
  }

  _parseTaxisDate(dateString){
    let match = dateString.match(/(\d{2})(?:\.)(\d{2})(?:\.)(\d{4})(?:\.?)/);
    return new Date(match[3], match[2], match[1]);
  }
}
