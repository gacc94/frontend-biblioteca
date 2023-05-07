import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "./app/app.component";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {provideRouter} from "@angular/router";
import {appRouting} from "./app/app.routing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRouting),
        importProvidersFrom(
            HttpClientModule,
            FlexLayoutModule,
            BrowserAnimationsModule
        )
    ]
}).then(r => r.components);