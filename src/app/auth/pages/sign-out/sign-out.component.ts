import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {SharedModule} from "@shared/shared.module";
import {MaterialModule} from "@material/material.module";

@Component({
    selector: 'app-sign-out',
    templateUrl: './sign-out.component.html',
    styleUrls: ['./sign-out.component.scss'],
    standalone: true,
    imports: [CommonModule, SharedModule, MaterialModule]
})
export class SignOutComponent {

}
