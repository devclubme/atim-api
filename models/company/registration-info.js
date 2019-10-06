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
      date: this.date,
      institution: this.institution,
    };
    if(!this.vatRegistration) return dto;

    dto.vatId = this.vatRegistration.id;
    dto.vatRegistrationDate = this.vatRegistration.date;
    return dto;
  }

  static fromDto({id, date, institution, vatId, vatRegistrationDate}){
    let vatInfo = !!vatId ? { id: vatId, date: vatRegistrationDate} : undefined;
    return new RegistrationInfo(id, date, institution, vatInfo);
  }
}
