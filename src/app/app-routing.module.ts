import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CorePublicLayoutComponent} from "@core/layout/core-public-layout/core-public-layout.component";

const routes: Routes = [
    {
        path: '',
        // component: CorePublicLayoutComponent,
        loadChildren: () => import('./core/core.module').then((m)=>m.CoreModule)
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
