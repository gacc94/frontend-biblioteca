import { Routes } from '@angular/router';
import {SecurityLayoutComponent} from "@security/layout/security-layout/security-layout.component";
import {UserComponent} from "@security/pages/user/user.component";
import {RolComponent} from "@security/pages/rol/rol.component";

export const securityRouting: Routes = [
    {
        path:'',
        component: SecurityLayoutComponent,
        children: [
            {
                path: 'user',
                component: UserComponent,
            },
            {
                path: 'rol',
                component: RolComponent,
            }
        ]
    }
];

