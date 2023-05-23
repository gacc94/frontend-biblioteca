import {Routes} from '@angular/router';
import {BookCatalogLayoutComponent} from "./layout/book-catalog-layout/book-catalog-layout.component";
import {BookComponent} from "./pages/book/book.component";
import {AuthorComponent} from "./pages/author/author.component";
import {EditorialComponent} from "./pages/editorial/editorial.component";

export const bookCatalogRouting: Routes = [
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
            }
        ]
    }
];
