import { Routes } from '@angular/router';
import { CorePublicLayoutComponent } from "@core/layout/core-public-layout/core-public-layout.component";
import { CorePrivateLayoutComponent } from "@core/layout/core-private-layout/core-private-layout.component";

export const coreRouting: Routes = [
    {
        path: '',
        component: CorePublicLayoutComponent,
        loadChildren: () => import('./../auth/auth.routing').then(m=>m.authRouting),
    },
    {
        path: 'book-catalog',
        component: CorePrivateLayoutComponent,
        loadChildren: () => import('./../book-catalog/bookCatalog.routing').then(m=>m.bookCatalogRouting),
    },
    {
        path: 'report',
        component: CorePrivateLayoutComponent,
        loadChildren: () => import('./../report/report.routing').then(m=>m.reportRouting),
    },
    {
        path: 'security',
        component: CorePrivateLayoutComponent,
        loadChildren: () => import('./../security/security.routing').then(m=>m.securityRouting),
    },
];
