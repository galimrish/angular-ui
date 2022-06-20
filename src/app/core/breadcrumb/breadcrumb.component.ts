import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  moduleId: 'breadCrumbModule',
  selector: 'app-breadcrumb',
  templateUrl: 'breadcrumb.component.html',
  styleUrls: ['breadcrumb.component.less']
})

export class BreadCrumbComponent implements OnInit {

    hideBreadCrumbs = false;

    breadcrumbs$ = this.router.events
        .pipe(filter(event => event instanceof NavigationEnd),
            distinctUntilChanged(),
            map(() => this.buildBreadCrumb(
                    (this.activatedRoute.snapshot as any)['_routerState'],
                    this.activatedRoute.root
                )
            )
        );

    constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router
    ) { }

    ngOnInit() {
        const ROUTE_DATA_BREADCRUMB = 'breadcrumb';
    }

    buildBreadCrumb(
        state: ActivatedRouteSnapshot,
        route: ActivatedRoute,
        url: string = '',
        breadcrumbs: Array<{label: string, url: string}> = []
    ): Array<{label: string, url: string}> {

        this.hideBreadCrumbs = state.url.toString() === '/';

        const label = route.routeConfig ? ( route.routeConfig.data ? route.routeConfig.data[ 'breadcrumb' ] : '' ) : '';
        let path = route.routeConfig?.path || '';

        const startInd = path.indexOf(':');
        if (startInd !== -1) {
            let endInd = path.indexOf('/');
            endInd = (endInd > -1) ? endInd : path.length;
            if (startInd > endInd) {
                endInd = path.length;
            }
            const paramName = path.slice(startInd + 1, endInd);
            route.params.subscribe(params => {
                const paramValue = params[paramName];
                path = path.replace(':' + paramName, paramValue);
            });
        }

        const nextUrl = `${url}${path}/`;
        const breadcrumb = {
            label: label,
            url: (nextUrl ? nextUrl : '/')
        };

        const newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];
        if (route.firstChild) {
            return this.buildBreadCrumb(state, route.firstChild, nextUrl, newBreadcrumbs);
        }

        return newBreadcrumbs;
    }
}
