import { PageInfo } from './page-info';
import { SortInfo } from './sort-info';

export class Response<T> {
    total: number;
    values: T[];

    constructor(
        total: number,
        values: T[] = [],
    ) {
        this.total = total;
        this.values = values;
    }
}