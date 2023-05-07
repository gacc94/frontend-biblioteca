import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "@env/environment";
import {IEditorial, IEditorialDTO} from "@models/editorial.model";
import {IPage} from "@models/page.model";

@Injectable({
    providedIn: 'root'
})
export class EditorialService {

    // private _http = Inject(HttpClient);

    constructor(
        private _http: HttpClient,
    ) {}

    public findByName(name: string, page: number, size: number): Observable<IPage<IEditorial>> {
        let params = new HttpParams();
        params = params.append('name', name);
        params = params.append('page', page);
        params = params.append('size', size);
        params = params.append('field', '');
        params = params.append('order', '');

        return this._http.get<IPage<IEditorial>>(`${environment.urlBase}/editorials/editorial?` + params);
    }

    public save(editorial: IEditorialDTO): Observable<any> {
        return this._http.post(`${environment.urlBase}/editorials`,editorial)
    }

    public update(editorial: IEditorialDTO, id: number): Observable<any> {
        return this._http.put(`${environment.urlBase}/editorials/${id}`,editorial)
    }
    public findById(id: number): Observable<IEditorial> {
        return this._http.get<IEditorial>(`${environment.urlBase}/editorials/${id}`);
    }

}