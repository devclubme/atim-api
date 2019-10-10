import {
  request
} from 'graphql-request'

export default class TaxisProxy {

  async getCompany(companyId) {
    let { taxis : { company } } = await request(this._taxisServiceEndpoint, this._taxisProxyQuery, {
      companyId
    });
    return company;
  }

  constructor(taxisServiceEndpoint = process.env.taxisServiceEndpoint) {
    if (!taxisServiceEndpoint) {
      throw new Error("Taxis Service Endpoint is not defined");
    }
    this._taxisServiceEndpoint = taxisServiceEndpoint;
    this._taxisProxyQuery = `
    query CompanyById($companyId : String!){
      taxis {
        company(companyId: $companyId) {
          companyName
          businessSectorCode
          businessSectorName
          companyAddress
          companyId
          companyRegisteredForVat
          companyRegistrationDate
          companyRegistrationInstitution
          companyRegistrationId
          companyVatRegistrationDate
          companyVatRegistrationId
          financialStatements {
            year
            statementId
            balance {
              income
              expense
            }
          }
          taxArea
        }
        institution
        version
      }
    }`;
  }
}
