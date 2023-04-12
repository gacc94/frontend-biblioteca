import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';


interface CardLayout {
    columns: number;
    miniCard: ColumnRow;
    chart: ColumnRow;
    table: ColumnRow;
}
interface ColumnRow {
    cols: number,
    rows: number
}

@Component({
    selector: 'app-dashboard-main',
    templateUrl: './dashboard-main.component.html',
    styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent {
    values!: CardLayout ;

    constructor(private breakpointObserver: BreakpointObserver) {}

    /** Based on the screen size, switch from standard to one column per row */
    cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(({ matches }) => {
            if (matches) {
                return [
                    { title: 'Card 1', cols: 1, rows: 1 },
                    { title: 'Card 2', cols: 1, rows: 1 },
                    { title: 'Card 3', cols: 1, rows: 1 },
                    { title: 'Card 4', cols: 1, rows: 1 }
                ];
            }
            return [
                { title: 'Card 1', cols: 1, rows: 1 },
                { title: 'Card 2', cols: 1, rows: 1 },
                { title: 'Card 3', cols: 1, rows: 1 },
                { title: 'Card 4', cols: 1, rows: 1 },
                { title: 'Card 5', cols: 2, rows: 1 },
                { title: 'Card 6', cols: 2, rows: 1 },
                { title: 'Card 7', cols: 2, rows: 1 },
                { title: 'Card 8', cols: 2, rows: 1 },
                { title: 'Card 9', cols: 4, rows: 1 },
            ];
        })
    );


    cardLayout = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(({ matches }) => {
                if (matches) {
                    return {
                        columns: 1,
                        miniCard: { cols: 1, rows: 1 },
                        chart: { cols: 1, rows: 2 },
                        table: { cols: 1, rows: 4 },
                    };
                }

                return {
                    columns:  4,
                    miniCard: { cols: 1, rows: 1 },
                    chart: { cols: 2, rows: 2 },
                    table: { cols: 4, rows: 4 },
                };
            })
        )
        .subscribe({
            next: (value) => {
                this.values = value;
                console.log(this.values)
            }
        });


}
