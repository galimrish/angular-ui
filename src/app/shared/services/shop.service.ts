import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Response } from '../../models/shared/response';
import { AppSnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';
import { Shop } from 'src/app/models/crm/shop';

@Injectable()
export class ShopService {

    constructor(
        private http: HttpClient,
        private snackBar: AppSnackBarComponent,
        @Inject('API_URL') private address: string
    ) { }

    getList(
        name?: string,
        shopCategory?: string,
        merchandise?: string,
        page: number = 0,
        size: number = 0,
        sort_field?: string,
        sort_order: string = 'asc',
    ): Observable<Response<Shop>> {
        const sorter = sort_field && sort_order ? `${sort_field},${sort_order}` : '';
        let request = new HttpParams();
        if (name) { request = request.set('name', name); }
        if (shopCategory) { request = request.set('shopCategory', shopCategory); }
        if (merchandise) { request = request.set('merchandise', merchandise); }
        if (page) { request = request.set('page', page.toString()); }
        if (size) { request = request.set('size', size.toString()); }
        if (sorter.length > 0) { request = request.set('sort', sorter); }
        return this.http
            .get<Response<Shop>>(`${this.address}/api/shop`,
                {
                    params: request,
                    observe: 'response'
                })
            .pipe(
                map((response: any) => new Response<Shop>(+response.headers.get('x-total-count'), response.body))
            );
    }

    create(entity: Shop) {
        return this.http
            .post(`${this.address}/api/shop/`, {
                    name: entity.name,
                    shopCategory: entity.shopCategory,
                    merchandise: entity.merchandise,
                },
                { responseType: 'text'}
            ).pipe(
                tap(_ => this.snackBar.openSnackBar('Added successfully', 'green-snackbar'))
            );
    }

    getElement(id: string): Observable<Shop> {
        return this.http
            .get<Shop>(`${this.address}/api/shop/${id}`,
                {
                    observe: 'response'
                })
            .pipe(
                map((response: any) => {
                    return new Shop(
                        response.body.id,
                        response.body.name,
                        response.body.shopCategory,
                        response.body.merchandise,
                    );
                })
            );
    }

    update(id: string, entity: Shop) {
        return this.http
            .put(
                `${this.address}/api/shop/${id}`,
                {
                    name: entity.name,
                    shopCategory: entity.shopCategory,
                    merchandise: entity.merchandise,
                },
                { responseType: 'text'}
            ).pipe(
                tap(_ => this.snackBar.openSnackBar('Updated successfully', 'green-snackbar'))
            );
    }

    delete(id: string, name: string) {
        return this.http
            .delete(`${this.address}/api/shop/${id}/`, { responseType: 'text' })
            .pipe(
                tap(_ => this.snackBar.openSnackBar(`Deleted '${name}' successfully`, 'green-snackbar'))
            );
    }
}
