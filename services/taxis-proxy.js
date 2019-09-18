import {
  request
} from 'graphql-request'

export class TaxisProxy {

  getCompany(companyId) {
    let result = await request(process.env.taxisServiceEndpoint, this._taxisProxyQuery, {
      companyId
    });
    // maybe do something with the result (like map into our own model?)
    return result;
  }
  
  constructor() {
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
          taxArea
          financialStatements {
            details {
              statementYear
              statementToDate
              statementId
              statementFromDate
              statementDate
              statementCashFlowMethod
              statementAuthorUnid
              statementAuthorName
              statementAuthorEmail
              consolidatedStatement
              companyOfficialUnid
              companyOfficialLastName
              companyOfficialFirstName
              companyName
              companyLocation
              companyId
              changeType
              businessSectorCode
            }
            statementId
            year
          }
        }
        institution
        version
      }
    }`;
  }
}
