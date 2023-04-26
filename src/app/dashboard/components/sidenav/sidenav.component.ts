import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{
    menuItems = ['dashboard', 'sales', 'orders', 'customers', 'products'];

    constructor(private breakpointObserver: BreakpointObserver) {}

    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        )

    ngOnInit():void {
        this.isHandset$.subscribe({
            next: (value) => {
                console.log(value);
            }
        })
    }
}
