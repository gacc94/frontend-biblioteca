import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignOutComponent } from './pages/sign-out/sign-out.component';
import {MaterialModule} from "../material/material.module";
import {SharedModule} from "@shared/shared.module";


@NgModule({
    declarations: [
        AuthLayoutComponent,
        SignInComponent,
        SignOutComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MaterialModule,
        SharedModule,
    ]
})
export class AuthModule { }
