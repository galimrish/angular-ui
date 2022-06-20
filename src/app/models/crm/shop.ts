export class Shop {
  id?: string;
  name?: string;
  shopCategory?: string;
  merchandise?: string;
  versionDate?: string;

  constructor(
    id?: string,
    name?: string,
    shopCategory?: string,
    merchandise?: string,
    versionDate?: string,
  ) {
    this.id = id;
    this.name = name;
    this.shopCategory = shopCategory;
    this.merchandise = merchandise;
    this.versionDate = versionDate;
  }
}