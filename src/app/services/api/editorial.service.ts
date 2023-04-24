import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "@env/environment";

@Injectable({
    providedIn: 'root'
})
export class EditorialService {

    private _http = Inject(HttpClient);

    constructor() {
    }

    public findByName(name: string, page: number, size: number): Observable<any> {
        let params = new HttpParams();
        params = params.append('name', name);
        params = params.append('page', page);
        params = params.append('size', size);
        params = params.append('field', '');
        params = params.append('order', '');

        return this._http.get(`${environment}?` + params);
    }

}
