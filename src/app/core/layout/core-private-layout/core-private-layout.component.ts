import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "@shared/shared.module";

@Component({
    selector: 'app-core-private-layout',
    templateUrl: './core-private-layout.component.html',
    styleUrls: ['./core-private-layout.component.scss'],
    standalone: true,
    imports: [RouterModule,ReactiveFormsModule,SharedModule],

})
export class CorePrivateLayoutComponent {
}
