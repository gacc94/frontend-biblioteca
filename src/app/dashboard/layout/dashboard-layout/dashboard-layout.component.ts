import { Component } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {

    mySubject$ = new Subject<string>();
    myBehaviorSubject = new BehaviorSubject<string>('');
    menuItems = ['dashboard', 'sales', 'orders', 'customers', 'products'];

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    constructor(private breakpointObserver: BreakpointObserver) {}



}
