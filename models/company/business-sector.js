export default class BusinessSector {
  constructor(code, name) {
    this.code = code;
    this.name = name;
    Object.freeze(this);
  }

  toDto(){
    return {
      code: this.code,
      name: this.name
    };
  }

  static fromDto({code, name }){
    return new BusinessSector(code, name);
  }
}
