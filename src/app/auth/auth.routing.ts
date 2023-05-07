import { Routes } from '@angular/router';
import {AuthLayoutComponent} from "@auth/layout/auth-layout/auth-layout.component";
import {SignInComponent} from "@auth/pages/sign-in/sign-in.component";
import {SignOutComponent} from "@auth/pages/sign-out/sign-out.component";

export const authRouting: Routes = [
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
