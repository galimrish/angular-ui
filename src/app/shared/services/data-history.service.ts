import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, of } from 'rxjs';
import { Response } from '../../models/shared/response';
import * as moment from 'moment';
import { AppSnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';
import { DataHistory } from 'src/app/models/shared/data-history';

@Injectable()
export class DataHistoryService {

    constructor(
        private http: HttpClient,
        private snackBar: AppSnackBarComponent,
        @Inject('API_URL') private address: string
    ) { }

    getHistory(
        path: string,
        page: number = 0,
        size: number = 0,
        sort_field?: string,
        sort_order?: string,
        id?: string,
        beginChangeDate?: string,
        endChangeDate?: string
    ): Observable<Response<DataHistory>> {
        const sorter = sort_field && sort_order ? `${sort_field},${sort_order}` : '';
        let request = new HttpParams();
        if (page) { request = request.set('page', page.toString()); }
        if (size) { request = request.set('size', size.toString()); }
        if (sorter.length > 0) {
            request = request.set('sort', sorter);
        }
        if (id) { request = request.set('id', id.toString()); }
        if (beginChangeDate) { request = request.set('beginChangeDate', moment(beginChangeDate).startOf('D').toISOString()); }
        if (endChangeDate) { request = request.set('endChangeDate', moment(endChangeDate).endOf('D').toISOString()); }

        return this.http.get<Response<DataHistory>>(
            `${this.address}/api/${path}/history`,
            {
                params: request,
                observe: 'response'
            }
        ).pipe(
            map((response: any) => new Response<DataHistory>(
                    +response.headers.get('x-total-count'),
                    response.body
                )
            )
        );
    }
}