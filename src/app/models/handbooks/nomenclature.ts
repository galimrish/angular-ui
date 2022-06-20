export class Nomenclature {
    id?: string;
    name?: string;
    code?: string;
    shortName?: string;
    weight?: number;
    versionDate?: Date;

    constructor(
      id?: string,
      name?: string,
      code?: string,
      shortName?: string,
      weight?: number,
      versionDate?: Date,
    ) {
      this.id = id;
      this.name = name;
      this.code = code;
      this.shortName = shortName;
      this.weight = weight;
      this.versionDate = versionDate;
    }
  }
