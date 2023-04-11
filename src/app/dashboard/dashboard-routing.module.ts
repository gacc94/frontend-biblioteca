import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardLayoutComponent} from "./layout/dashboard-layout/dashboard-layout.component";
import {DashboardMainComponent} from "./pages/dashboard-main/dashboard-main.component";

const routes: Routes = [
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            {
                path: '',
                component: DashboardMainComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
