import {
  request
} from 'graphql-request'

export class TaxisProxy {
  constructor() {
    this._taxisProxyQuery = `{
            taxis {
              company(companyId: $companyId) {
                companyName
               }
             }
           }`;
  }

  getCompany(companyId) {
    let result = await request(process.env.taxisServiceEndpoint, this._taxisProxyQuery, {
      companyId
    });
    // maybe do something with the result (like map into our own model?)
    return result;
  }
}
