import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    private _router: Router = inject(Router);
    constructor(
    ) {}

    goToBook():void{
        this._router.navigate(['book-catalog/book'])
            .then();
    }
    goToAuthor():void{
        this._router.navigate(['book-catalog/author'])
            .then();
    }
    goToEditorial():void{
        this._router.navigate(['book-catalog/editorial'])
            .then();
    }
    goToUser():void{
        this._router.navigate(['security/user'])
            .then();
    }
    goToRol():void {
        this._router.navigate(['security/rol'])
            .then();
    }
    goToTDForm(): void{
        this._router.navigate(['book-catalog/template-forms']).then()
    }

}
