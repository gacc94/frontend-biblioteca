import { Component } from '@angular/core';
import {environment} from "@env/environment";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'bliblioteca-frontend';
    constructor(

    ) {
        console.log('env: => ', environment.name)
    }
}
