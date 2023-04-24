import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddEditorialComponent} from "../add-editorial/add-editorial.component";

export interface PeriodicElement {
    id: number;
    description: string;
    // weight: number;
    // symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
    {id: 1, description: 'Hydrogen'},
    {id: 2, description: 'Helium'},
    {id: 3, description: 'Lithium'},
    {id: 4, description: 'Beryllium'},
    {id: 5, description: 'Boron'},
    {id: 6, description: 'Carbon'},
    {id: 7, description: 'Nitrogen'},
    {id: 8, description: 'Oxygen'},
    {id: 9, description: 'Fluorine'},
    {id: 10, description: 'Neon'},
];
@Component({
    selector: 'app-list-editorial',
    templateUrl: './list-editorial.component.html',
    styleUrls: ['./list-editorial.component.scss']
})
export class ListEditorialComponent implements OnInit{
    // displayedColumns: string[] = ['position', 'description', 'weight', 'symbol'];
    // dataSource: Array<PeriodicElement> = ELEMENT_DATA;
    public title!: string;
    public columnsTable!:  string[];
    public dataSource!: MatTableDataSource<PeriodicElement>;
    public totalElement!: number;

    constructor(
        private _dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.title = 'Catalogo de Libros';
        this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
        this.columnsTable = ['id', 'description','selected'];
        this.totalElement = ELEMENT_DATA.length;
    }

    public create(element?:PeriodicElement):void {
        const dialogConfig= new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '350rem';
        dialogConfig.height = '50%';
        dialogConfig.maxWidth = '90%';
        if (element){
            dialogConfig.data = element;
        }
        // console.log('c-list: ',element)
        const dialogRef = this._dialog
            .open(AddEditorialComponent,dialogConfig);

        dialogRef.afterClosed()
            .subscribe({
                next: (value) => {
                    console.log(value)
                }
            });

    }

}
