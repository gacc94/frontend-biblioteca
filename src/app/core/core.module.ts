import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreLayoutComponent } from './layout/core-layout/core-layout.component';
import { CorePrivateLayoutComponent } from '@core/layout/core-private-layout/core-private-layout.component';
import { CorePublicLayoutComponent } from './layout/core-public-layout/core-public-layout.component';
import {SharedModule} from "@shared/shared.module";
import {MaterialModule} from "../material/material.module";


@NgModule({
    declarations: [
    CoreLayoutComponent,
         CorePrivateLayoutComponent,
         CorePublicLayoutComponent
  ],
    imports: [
        CommonModule,
        CoreRoutingModule,
        SharedModule,
        MaterialModule
    ]
})
export class CoreModule { }
