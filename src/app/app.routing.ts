import { Routes } from '@angular/router';

export const appRouting: Routes = [
    {
        path: '',
        loadChildren: () => import('./core/core.routing').then((m)=>m.coreRouting)
    },
];
