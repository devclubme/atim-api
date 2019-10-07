import { success, failure } from '../libs/response-lib';
import AddOrUpdateCompany from './interactors/add-or-update-company';

export async function main({ pathParameters: { id: companyId } }, context){
  try {
    let addOrUpdateCompany = new AddOrUpdateCompany();
    await addOrUpdateCompany.execute(companyId);
    return success({updated: true});
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
