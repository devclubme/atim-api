import {
  request
} from 'graphql-request'

export class TaxisProxy {

  async getCompany(companyId) {
    let result = await request(this._taxisServiceEndpoint, this._taxisProxyQuery, {
      companyId
    });
    // maybe do something with the result (like map into our own model?)
    return result.taxis.company;
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
