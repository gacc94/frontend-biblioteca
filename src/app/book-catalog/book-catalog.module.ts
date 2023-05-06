import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookCatalogRoutingModule } from './book-catalog-routing.module';
import { BookCatalogLayoutComponent } from './layout/book-catalog-layout/book-catalog-layout.component';
import { BookComponent } from './pages/book/book.component';
import { AuthorComponent } from './pages/author/author.component';
import { EditorialComponent } from './pages/editorial/editorial.component';
import { ListEditorialComponent } from './components/list-editorial/list-editorial.component';
import { AddEditorialComponent } from './components/add-editorial/add-editorial.component';
import {SharedModule} from "@shared/shared.module";
import {MaterialModule} from "../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import { TemplateDriverFormsComponent } from './pages/template-driver-forms/template-driver-forms.component';
import { ReactiveFormsComponent } from './pages/reactive-forms/reactive-forms.component';


@NgModule({
    declarations: [
        BookCatalogLayoutComponent,
        BookComponent,
        AuthorComponent,
        EditorialComponent,
        ListEditorialComponent,
        AddEditorialComponent,
        TemplateDriverFormsComponent,
        ReactiveFormsComponent
    ],
    imports: [
        CommonModule,
        BookCatalogRoutingModule,
        SharedModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        FlexModule
    ]
})
export class BookCatalogModule { }
