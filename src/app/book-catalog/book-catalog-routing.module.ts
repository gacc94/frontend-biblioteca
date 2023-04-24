import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookCatalogLayoutComponent} from "./layout/book-catalog-layout/book-catalog-layout.component";
import {BookComponent} from "./pages/book/book.component";
import {AuthorComponent} from "./pages/author/author.component";
import {EditorialComponent} from "./pages/editorial/editorial.component";
import {TemplateDriverFormsComponent} from "./pages/template-driver-forms/template-driver-forms.component";

const routes: Routes = [
    {
        path: '',
        component: BookCatalogLayoutComponent,
        children: [
            {
                path: 'book',
                component: BookComponent,
            },
            {
                path: 'author',
                title: 'Biblioteca - author',
                component: AuthorComponent,
            },
            {
                path: 'editorial',
                title: 'Biblioteca - editorial',
                component: EditorialComponent,
            },
            {
                path: 'template-forms',
                title: 'Template - forms',
                component: TemplateDriverFormsComponent,
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BookCatalogRoutingModule { }
