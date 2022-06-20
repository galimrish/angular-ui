import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Response } from '../../models/shared/response';
import { AppSnackBarComponent } from 'src/app/core/snack-bar/snack-bar.component';
import { PickupPoint } from 'src/app/models/crm/pickup-point';

@Injectable()
export class PickupPointService {

    constructor(
        private http: HttpClient,
        private snackBar: AppSnackBarComponent,
        @Inject('API_URL') private address: string
    ) { }

    getList(
        name?: string,
        code?: string,
        city?: string,
        page: number = 0,
        size: number = 0,
        sort_field?: string,
        sort_order: string = 'asc',
    ): Observable<Response<PickupPoint>> {
        const sorter = sort_field && sort_order ? `${sort_field},${sort_order}` : '';
        let request = new HttpParams();
        if (name) { request = request.set('name', name); }
        if (code) { request = request.set('code', code); }
        if (city) { request = request.set('city', city); }
        if (page) { request = request.set('page', page.toString()); }
        if (size) { request = request.set('size', size.toString()); }
        if (sorter.length > 0) { request = request.set('sort', sorter); }
        return this.http
            .get<Response<PickupPoint>>(`${this.address}/api/pickup-point`,
                {
                    params: request,
                    observe: 'response'
                })
            .pipe(
                map((response: any) => new Response<PickupPoint>(+response.headers.get('x-total-count'), response.body))
            );
    }

    create(entity: PickupPoint) {
        return this.http
            .post(`${this.address}/api/pickup-point/`, {
                    name: entity.name,
                    code: entity.code,
                    additionalCode: entity.additionalCode,
                    city: entity.city,
                    pickupPointTypeName: entity.pickupPointTypeName,
                },
                { responseType: 'text'}
            ).pipe(
                tap(_ => this.snackBar.openSnackBar('Added successfully', 'green-snackbar'))
            );
    }

    getElement(id: string): Observable<PickupPoint> {
        return this.http
            .get<PickupPoint>(`${this.address}/api/pickup-point/${id}`,
                {
                    observe: 'response'
                })
            .pipe(
                map((response: any) => {
                    return new PickupPoint(
                        response.body.id,
                        response.body.name,
                        response.body.code,
                        response.body.additionalCode,
                        response.body.city,
                        response.body.pickupPointType,
                    );
                })
            );
    }

    update(id: string, entity: PickupPoint) {
        return this.http
            .put(
                `${this.address}/api/pickup-point/${id}`,
                {
                    name: entity.name,
                    code: entity.code,
                    additionalCode: entity.additionalCode,
                    city: entity.city,
                    pickupPointTypeName: entity.pickupPointTypeName,
                },
                { responseType: 'text'}
            ).pipe(
                tap(_ => this.snackBar.openSnackBar('Updated successfully', 'green-snackbar'))
            );
    }

    delete(id: string, name: string) {
        return this.http
            .delete(`${this.address}/api/pickup-point/${id}/`, { responseType: 'text' })
            .pipe(
                tap(_ => this.snackBar.openSnackBar(`Deleted '${name}' successfully`, 'green-snackbar'))
            );
    }
}
