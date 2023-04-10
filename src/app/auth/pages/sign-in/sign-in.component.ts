import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss']
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
    ngAfterViewInit(){
        console.log('ngAfterViewInit: => ',this._title)
    }
    ngAfterContentInit(){
        console.log('ngAfterContentInit: => ',this._title)
    }
    ngDoCheck(){
        console.log('ngDoCheck: => ',this._title)
    }
    ngOnDestroy(){
        console.log('ngOnDestroy: => ',this._title)
    }
}
