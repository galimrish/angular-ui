import { Address } from './address';

export class Branch {
  id?: string;
  name?: string;
  address?: Address;
  versionDate?: string;

  constructor(
    id?: string,
    name?: string,
    address?: Address,
    versionDate?: string,
  ) {
    this.id = id;
    this.name = name;
    this.address = address || new Address();
    this.versionDate = versionDate;
  }
}