import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {AlertService} from "@services/alert.service";
import {catchError, Observable, throwError} from "rxjs";
import {BibliotecaConstansUtil} from "@utils/biblioteca-constans.util";

export function httpErrorResponseInterceptor(
    request: HttpRequest<any> , next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
    const _alertService = inject(AlertService);
    console.log('Init Interceptor');
    return next(request).pipe(
        catchError( (err: HttpErrorResponse) => {
            console.log(err);
            if (err.status === 404) {
                _alertService.notification(
                    BibliotecaConstansUtil.TITLE_REQUEST_HTTP_SERVER_ERROR,
                    BibliotecaConstansUtil.VC_ERROR,
                )
            }
            return throwError(err);
        })
    )
}