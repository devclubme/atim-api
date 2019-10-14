import { success, failure } from "../libs/response-lib";
import CompanyRepository from "../repository/companies-repository";

export async function main(event, context){
  try {
    let repository = new CompanyRepository();
    let companies = await repository.getAll();
    return success(companies);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
