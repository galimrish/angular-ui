export class PrintInfoType {
    id?: string;
    name?: string;
    code?: string;
    shortName?: string;

    constructor(
      id?: string,
      name?: string,
      code?: string,
      shortName?: string,
      versionDate?: Date,
    ) {
      this.id = id;
      this.name = name;
      this.code = code;
      this.shortName = shortName;
    }
  }
