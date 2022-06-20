import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Response } from '../../models/shared/response';
import { AppSnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';
import { Branch } from 'src/app/models/crm/branch';

@Injectable()
export class BranchService {

    constructor(
        private http: HttpClient,
        private snackBar: AppSnackBarComponent,
        @Inject('API_URL') private address: string
    ) { }

    getList(
        name?: string,
        page: number = 0,
        size: number = 0,
        sort_field?: string,
        sort_order: string = 'asc',
    ): Observable<Response<Branch>> {
        const sorter = sort_field && sort_order ? `${sort_field},${sort_order}` : '';
        let request = new HttpParams();
        if (name) { request = request.set('name', name); }
        if (page) { request = request.set('page', page.toString()); }
        if (size) { request = request.set('size', size.toString()); }
        if (sorter.length > 0) { request = request.set('sort', sorter); }
        return this.http
            .get<Response<Branch>>(`${this.address}/api/branch`,
                {
                    params: request,
                    observe: 'response'
                })
            .pipe(
                map((response: any) => new Response<Branch>(+response.headers.get('x-total-count'), response.body))
            );
    }

    create(newBranch: Branch) {
        return this.http
            .post(`${this.address}/api/branch/`, {
                    name: newBranch.name,
                    address: newBranch.address,
                },
                { responseType: 'text'}
            ).pipe(
                tap(_ => this.snackBar.openSnackBar('Added successfully', 'green-snackbar'))
            );
    }

    getElement(id: string): Observable<Branch> {
        return this.http
            .get<Branch>(`${this.address}/api/branch/${id}`,
                {
                    observe: 'response'
                })
            .pipe(
                map((response: any) => {
                    return new Branch(
                        response.body.id,
                        response.body.name,
                        response.body.address);
                })
            );
    }

    update(id: string, branch: Branch) {
        return this.http
            .put(
                `${this.address}/api/branch/${id}`,
                {
                    name: branch.name,
                    address: branch.address,
                },
                { responseType: 'text'}
            ).pipe(
                tap(_ => this.snackBar.openSnackBar('Updated successfully', 'green-snackbar'))
            );
    }
}
