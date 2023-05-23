import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IconsModule} from "@shared/icons/icons.module";
import { HeaderComponent } from './components/header/header.component';
import {MaterialModule} from "@material/material.module";



@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        IconsModule,
        HeaderComponent
    ]
})
export class SharedModule { }
