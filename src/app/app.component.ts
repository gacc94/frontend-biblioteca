import { Component } from '@angular/core';
import {environment} from "@env/environment";
import {RouterModule} from "@angular/router";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterModule]
})
export class AppComponent {
    title = 'bliblioteca-frontend';
    constructor(

    ) {
        console.log('env: => ', environment.name)
    }
}
