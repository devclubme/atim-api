import CompaniesRepository from '../../repository/companies-repository';
import AddOrUpdateCompany from '../interactors/add-or-update-company';
import { success, failure } from '../../libs/response-lib';

export async function main(event, context){
  try {
    let repository = new CompaniesRepository();
    let addOrUpdateCompany = new AddOrUpdateCompany();
    let companyIds = (await repository.getAll()).map(c => c.id);
    for (const companyId of companyIds) {
      await addOrUpdateCompany.execute(companyId);
    }
    return success({companyIds});
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
