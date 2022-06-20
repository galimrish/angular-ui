export class Address {
    zip?: string;
    region?: string;
    city?: string;
    street?: string;
    houseNum?: string;
    buildNum?: string;
    blockNum?: string;
    oneLine?: string;

    constructor(
        zip: string = '',
        region: string = '',
        city: string = '',
        street: string = '',
        houseNum: string = '',
        buildNum: string = '',
        blockNum: string = '',
        oneLine: string = '',
    ) {
        this.zip = zip;
        this.region = region;
        this.city = city;
        this.street = street;
        this.houseNum = houseNum;
        this.buildNum = buildNum;
        this.blockNum = blockNum;
        this.oneLine = oneLine;
    }
}
