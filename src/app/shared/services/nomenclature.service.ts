import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Response } from '../../models/shared/response';
import { Nomenclature } from 'src/app/models/handbooks/nomenclature';
import { AppSnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';

@Injectable()
export class NomenclatureService {

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
    ): Observable<Response<Nomenclature>> {
        const sorter = sort_field && sort_order ? `${sort_field},${sort_order}` : '';
        let request = new HttpParams();
        if (page) { request = request.set('page', page.toString()); }
        if (size) { request = request.set('size', size.toString()); }
        if (sorter.length > 0) { request = request.set('sort', sorter); }
        return this.http
            .get<Response<Nomenclature>>(`${this.address}/api/nomenclature`,
                {
                    params: request,
                    observe: 'response'
                })
            .pipe(
                map((response: any) => new Response<Nomenclature>(+response.headers.get('x-total-count'), response.body))
            );
    }

    create(newNomenclature: Nomenclature) {
        return this.http
            .post(`${this.address}/api/nomenclature/`, {
                    name: newNomenclature.name,
                    code: newNomenclature.code,
                    shortName: newNomenclature.shortName,
                    weight: newNomenclature.weight
                },
                { responseType: 'text'}
            ).pipe(
                tap(_ => this.snackBar.openSnackBar('Added successfully', 'green-snackbar'))
            );
    }

    getElement(id: string): Observable<Nomenclature> {
        return this.http
            .get<Nomenclature>(`${this.address}/api/nomenclature/${id}`,
                {
                    observe: 'response'
                })
            .pipe(
                map((response: any) => {
                    return new Nomenclature(
                        response.body.id,
                        response.body.name,
                        response.body.code,
                        response.body.shortName,
                        response.body.weight,
                        response.body.versionDate);
                })
            );
    }

    update(id: string, nomenclature: Nomenclature) {
        return this.http
            .put(
                `${this.address}/api/nomenclature/${id}`,
                {
                    name: nomenclature.name,
                    code: nomenclature.code,
                    shortName: nomenclature.shortName,
                    weight: nomenclature.weight
                },
                { responseType: 'text'}
            ).pipe(
                tap(_ => this.snackBar.openSnackBar('Updated successfully', 'green-snackbar'))
            );
    }

    delete(id: string, name: string) {
        return this.http
            .delete(`${this.address}/api/nomenclature/${id}/`, { responseType: 'text' })
            .pipe(
                tap(_ => this.snackBar.openSnackBar(`Deleted '${name}' successfully`, 'green-snackbar'))
            );
    }
}
