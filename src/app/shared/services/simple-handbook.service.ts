import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { SimpleHandbook } from 'src/app/models/shared/simple-handbook';
import { Response } from '../../models/shared/response';
import { AppSnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';

@Injectable()
export class SimpleHandbookService {

    constructor(
        private http: HttpClient,
        private snackBar: AppSnackBarComponent,
        @Inject('API_URL') private address: string
    ) { }

    get(
        path: string,
        page: number = 0,
        size: number = 0,
        sort_field?: string,
        sort_order: string = 'asc',
        name?: string | null,
    ): Observable<Response<SimpleHandbook>> {
        const sorter = sort_field && sort_order ? `${sort_field},${sort_order}` : '';
        let request = new HttpParams();
        if (page) { request = request.set('page', page.toString()); }
        if (size) { request = request.set('size', size.toString()); }
        if (sorter.length > 0) {
            request = request.set('sort', sorter);
        }
        if (name) { request = request.set('name', name); }
        return this.http.get<Response<SimpleHandbook>>(
                `${this.address}/api/${path}`,
                {
                    params: request,
                    observe: 'response'
                }
            ).pipe(
                map((response: any) => new Response<SimpleHandbook>(
                        +response.headers.get('x-total-count'),
                        response.body
                    )
                )
            );
    }

    getElement(
        path: string,
        id: string,
    ): Observable<SimpleHandbook> {
        return this.http
            .get<SimpleHandbook>(`${this.address}/api/${path}/${id}`);
    }
    
    create(
        path: string,
        newSimpleHandbook: SimpleHandbook
    ) {
        return this.http
            .post(`${this.address}/api/${path}/`,
                {
                    name: newSimpleHandbook.name,
                    code: newSimpleHandbook.code,
                },
                { responseType: 'text'}
            ).pipe(
                tap(_ => this.snackBar.openSnackBar('Added successfully', 'green-snackbar'))
            );
    }

    update(
        path: string,
        id: string,
        simpleHandbook: SimpleHandbook
    ) {
        return this.http
            .put(`${this.address}/api/${path}/${id}`,
                {
                    name: simpleHandbook.name,
                    code: simpleHandbook.code,
                },
                { responseType: 'text'}
            ).pipe(
                tap(_ => this.snackBar.openSnackBar('Updated successfully', 'green-snackbar'))
            );
    }

    delete(
        path: string,
        id: string,
        name: string,
    ) {
        return this.http
            .delete(`${this.address}/api/${path}/${id}/`, { responseType: 'text' })
            .pipe(
                tap(_ => this.snackBar.openSnackBar(`Deleted '${name}' successfully`, 'green-snackbar'))
            );
    }
}