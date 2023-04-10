import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthLayoutComponent} from "@auth/layout/auth-layout/auth-layout.component";
import {SignInComponent} from "@auth/pages/sign-in/sign-in.component";
import {SignOutComponent} from "@auth/pages/sign-out/sign-out.component";

const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'sign-in',
                component: SignInComponent
            },
            {
                path: 'sign-out',
                component: SignOutComponent,
            },
            {
                path: '',
                redirectTo: 'sign-in',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
