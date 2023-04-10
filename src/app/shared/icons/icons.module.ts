import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";



@NgModule({
  // declarations: [],
  // imports: [
  //   CommonModule
  // ]
})
export class IconsModule {
    constructor(
       private _domSanitizer: DomSanitizer,
       private _matIconRegistry: MatIconRegistry,
    ) {
        this._matIconRegistry.addSvgIcon(
            'twitter',
            this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/twitter.svg'));
    }
}
