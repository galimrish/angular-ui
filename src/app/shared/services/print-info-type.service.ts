import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Response } from '../../models/shared/response';
import { AppSnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';
import { PrintInfoType } from 'src/app/models/handbooks/print-info-type';

@Injectable()
export class PrintInfoTypeService {

    constructor(
        private http: HttpClient,
        private snackBar: AppSnackBarComponent,
        @Inject('API_URL') private address: string
    ) { }

    getList(
        page: number = 0,
        size: number = 0,
        sort_field?: string,
        sort_order: string = 'asc',
    ): Observable<Response<PrintInfoType>> {
        const sorter = sort_field && sort_order ? `${sort_field},${sort_order}` : '';
        let request = new HttpParams();
        if (page) { request = request.set('page', page.toString()); }
        if (size) { request = request.set('size', size.toString()); }
        if (sorter.length > 0) { request = request.set('sort', sorter); }
        return this.http
            .get<Response<PrintInfoType>>(`${this.address}/api/print-info-type`,
                {
                    params: request,
                    observe: 'response'
                })
            .pipe(
                map((response: any) => new Response<PrintInfoType>(+response.headers.get('x-total-count'), response.body))
            );
    }

    create(newEntry: PrintInfoType) {
        return this.http
            .post(`${this.address}/api/print-info-type/`, {
                    name: newEntry.name,
                    code: newEntry.code,
                    shortName: newEntry.shortName,
                },
                { responseType: 'text'}
            ).pipe(
                tap(_ => this.snackBar.openSnackBar('Added successfully', 'green-snackbar'))
            );
    }

    getElement(id: string): Observable<PrintInfoType> {
        return this.http
            .get<PrintInfoType>(`${this.address}/api/print-info-type/${id}`,
                {
                    observe: 'response'
                })
            .pipe(
                map((response: any) => {
                    return new PrintInfoType(
                        response.body.id,
                        response.body.name,
                        response.body.code,
                        response.body.shortName,
                    );
                })
            );
    }

    update(id: string, updatedEntry: PrintInfoType) {
        return this.http
            .put(
                `${this.address}/api/print-info-type/${id}`,
                {
                    name: updatedEntry.name,
                    code: updatedEntry.code,
                    shortName: updatedEntry.shortName,
                },
                { responseType: 'text'}
            ).pipe(
                tap(_ => this.snackBar.openSnackBar('Updated successfully', 'green-snackbar'))
            );
    }

    delete(id: string, name: string) {
        return this.http
            .delete(`${this.address}/api/print-info-type/${id}/`, { responseType: 'text' })
            .pipe(
                tap(_ => this.snackBar.openSnackBar(`Deleted '${name}' successfully`, 'green-snackbar'))
            );
    }
}
