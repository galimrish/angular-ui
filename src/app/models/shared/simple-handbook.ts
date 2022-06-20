export class SimpleHandbook {
    id?: string;
    name?: string;
    code?: string;
    versionDate?: string;

    constructor(
        id?: string,
        name?: string,
        code?: string,
        versionDate?: string
    ) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.versionDate = versionDate;
    }
}
