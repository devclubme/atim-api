export default class RegistrationInfo {
  constructor(id, date, institution, vatInfo){
    this.id = id;
    this.date = date;
    this.institution = institution;
    this.vatRegistration = vatInfo;
    Object.freeze(this);
  }

  get isRegisteredForVat(){
    return !!this.vatRegistration;
  }

  toDto(){
    let dto = {
      id: this.id,
      date: this.date.toISOString(),
      institution: this.institution,
    };
    if(!this.vatRegistration) return dto;

    dto.vatId = this.vatRegistration.id;
    dto.vatRegistrationDate = this.vatRegistration.date.toISOString();
    dto.taxArea = this.vatRegistration.area;
    return dto;
  }

  static fromDto({id, date, institution, vatId, vatRegistrationDate, taxArea}){
    let vatInfo = !!vatId ? { id: vatId, date: new Date(Date.parse(vatRegistrationDate)), area: taxArea } : undefined;
    return new RegistrationInfo(id, new Date(Date.parse(date)), institution, vatInfo);
  }
}
