import JobProcessor from "./job-processor";
import AddOrUpdateCompany from "../../companies/interactors/add-or-update-company";

export default class CompanyRefreshJobProcessor extends JobProcessor {
  async _processJob({ params: { companyId }}){
    let addOrUpdateCompany = new AddOrUpdateCompany();
    await addOrUpdateCompany.execute(companyId);
  }
}
