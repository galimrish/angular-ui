
export class DataHistory {
    _id: string;
    id: string;
    changes: string;
    changeDate: Date;
    userId?: number;

    constructor(
        _id: string,
        id: string,
        changes: string,
        changeDate: Date,
    ) {
        this._id = _id;
        this.id = id;
        this.changes = changes;
        this.changeDate = changeDate;
    }
}
