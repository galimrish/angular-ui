export class PickupPoint {
  id?: string;
  name?: string;
  code?: string;
  additionalCode?: string;
  city?: string;
  pickupPointTypeName?: string;
  versionDate?: string;

  constructor(
    id?: string,
    name?: string,
    code?: string,
    additionalCode?: string,
    city?: string,
    pickupPointTypeName?: string,
    versionDate?: string,
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.additionalCode = additionalCode;
    this.city = city;
    this.pickupPointTypeName = pickupPointTypeName;
    this.versionDate = versionDate;
  }
}