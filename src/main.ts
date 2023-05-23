import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {provideRouter} from "@angular/router";
import {appRouting} from "./app/app.routing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {customMatPaginator} from "@utils/config/library.config";
import {httpErrorResponseInterceptor} from "./app/interceptors/library-interceptor";

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRouting),
        importProvidersFrom(
            HttpClientModule,
            FlexLayoutModule,
            BrowserAnimationsModule,
        ),
        provideHttpClient(withInterceptors([httpErrorResponseInterceptor])),
        {
            provide: MatPaginatorIntl,
            useValue: customMatPaginator()
        }
    ]
}).then(r => r.components);