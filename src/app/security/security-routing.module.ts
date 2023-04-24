import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SecurityLayoutComponent} from "@security/layout/security-layout/security-layout.component";
import {UserComponent} from "@security/pages/user/user.component";
import {RolComponent} from "@security/pages/rol/rol.component";

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
