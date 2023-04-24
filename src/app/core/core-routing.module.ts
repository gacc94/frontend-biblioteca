import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CorePublicLayoutComponent} from "@core/layout/core-public-layout/core-public-layout.component";
import {CorePrivateLayoutComponent} from "@core/layout/core-private-layout/core-private-layout.component";

const routes: Routes = [
    {
        path: '',
        component: CorePublicLayoutComponent,
        loadChildren: () => import('./../auth/auth.module').then(m=>m.AuthModule),
    },
    {
        path: 'book-catalog',
        component: CorePrivateLayoutComponent,
        loadChildren: () => import('./../book-catalog/book-catalog.module').then(m=>m.BookCatalogModule),
    },
    {
        path: 'report',
        component: CorePrivateLayoutComponent,
        loadChildren: () => import('./../report/report.module').then(m=>m.ReportModule),
    },
    {
        path: 'security',
        component: CorePrivateLayoutComponent,
        loadChildren: () => import('./../security/security.module').then(m=>m.SecurityModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
