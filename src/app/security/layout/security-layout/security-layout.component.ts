import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-security-layout',
    templateUrl: './security-layout.component.html',
    styleUrls: ['./security-layout.component.scss'],
    standalone: true,
    imports: [
        RouterOutlet
    ]
})
export class SecurityLayoutComponent {

}
