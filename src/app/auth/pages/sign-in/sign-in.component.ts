import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {SharedModule} from "@shared/shared.module";
import {MaterialModule} from "@material/material.module";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    standalone: true,
    imports: [CommonModule, SharedModule, MaterialModule, ReactiveFormsModule]
})
export class SignInComponent {
    constructor(private _title:Title) {
        console.log('constructor: => ',this._title)
    }
    ngOnInit(){
        console.log('ngOnInit: => ',this._title)
    }
    ngOnChanges(){
        console.log('ngOnChanges: => ',this._title)
    }
    // ngAfterViewInit(){
    //     console.log('ngAfterViewInit: => ',this._title)
    // }
    // ngAfterContentInit(){
    //     console.log('ngAfterContentInit: => ',this._title)
    // }
    // ngDoCheck(){
    //     console.log('ngDoCheck: => ',this._title)
    // }
    // ngOnDestroy(){
    //     console.log('ngOnDestroy: => ',this._title)
    // }
}
