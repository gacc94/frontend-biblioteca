import {AfterViewInit, Component, Inject, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddEditorialComponent} from "../add-editorial/add-editorial.component";
import {EditorialService} from "@services/api/editorial.service";
import {IEditorial, IEditorialDTO} from "@models/editorial.model";
import {merge, Subscription, switchMap, tap} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {HttpErrorResponse} from "@angular/common/http";
import {BibliotecaConstansUtil} from "@utils/biblioteca-constans.util";
import {CommonModule} from "@angular/common";
import {SharedModule} from "@shared/shared.module";
import {MaterialModule} from "@material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FirstUpperPipe} from "../../../pipes/first-upper.pipe";

@Component({
    selector: 'app-list-editorial',
    templateUrl: './list-editorial.component.html',
    styleUrls: ['./list-editorial.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        AddEditorialComponent,
        FirstUpperPipe,
    ],
})
export class ListEditorialComponent implements OnInit, AfterViewInit, OnDestroy {

    public search!: string;
    public title!: string;
    public columnsTable!: string[];
    public dataSource!: MatTableDataSource<IEditorial>;
    public totalElement!: number;
    public listEditorial!: Array<IEditorial>;
    @ViewChild(MatPaginator) _matPaginator!: MatPaginator;
    @ViewChild(MatSort) matSort!: MatSort;
    public editorialDto!: IEditorial;
    protected subscriptions: Array<Subscription> = [];

    constructor(
        private _dialog: MatDialog,
        private _editorialServ: EditorialService,
    ) {
    }

    ngOnInit() {
        this.title = 'Catalogo de Libros';
        this.columnsTable = ['id', 'name', 'selected'];
        console.log(this.listEditorial)
    }

    ngAfterViewInit() {
        this.findByName('', 0, 10)
        this.matSort.sortChange.subscribe(() => this._matPaginator.pageIndex = 0);
        merge(this.matSort.sortChange, this._matPaginator.page)
            .pipe(
                switchMap((val) => {
                    return this._editorialServ.findByName(
                        this.search ? this.search : '',
                        this._matPaginator.pageIndex,
                        this._matPaginator.pageSize
                    );
                }),
            )
            .subscribe({
                next: (value) => {
                    console.log(value)
                }
            });

        setTimeout(() => {
            console.log(this.listEditorial)
        }, 1000);
    }

    public create(element?: IEditorial): void {
        const dialogConfig: MatDialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '200rem';
        dialogConfig.height = 'auto';
        dialogConfig.maxWidth = '90%';
        if (element) {
            dialogConfig.data = element;
        } else {
            dialogConfig.data = {id: '', name: ''};
        }
        // console.log('c-list: ',element)
        const dialogRef = this._dialog
            .open(AddEditorialComponent, dialogConfig);

        dialogRef.afterClosed()
            .subscribe({
                next: (resp) => {
                    if (resp.action === BibliotecaConstansUtil.ACTION_UPDATE) {
                        this.update(resp.editorial, resp.id)
                    } else if (resp.action === BibliotecaConstansUtil.ACTION_ADD) {
                        this.save(resp.editorial)
                    }
                }
            });
    }

    public findByName(name: string, page: number, size: number): void {
        this.subscriptions.push(
            this._editorialServ.findByName(name, page, size)
                .pipe(
                    tap((val) => {
                        console.log(val)
                    }),
                )
                .subscribe({
                    next: (resp) => {
                        this.listEditorial = resp?.content;
                        this.dataSource = new MatTableDataSource<IEditorial>(this.listEditorial);
                        this.dataSource.paginator = this._matPaginator;
                        this.totalElement = resp.totalElements;
                    }
                })
        )
    }

    public onSearch(event: Event): void {
        const evt: KeyboardEvent = <KeyboardEvent>event;
        if (evt.key === 'Enter') {
            this.findByName(this.search, 0, 5);
        }
    }

    public onEraser(): void {
        this.onClearSearch();
        this.onClearListEditorial();
        this.findByName('', 0, 5);
    }

    public onClearSearch(): void {
        this.search = '';
    }

    public onClearListEditorial(): void {
        this.listEditorial = [];
    }

    public save(editorial: IEditorialDTO): void {
        this.subscriptions.push(
            this._editorialServ.save(editorial)
                .subscribe({
                    next: (value): void => {
                        alert('Se ha registrado con exito');
                        this.findById(value.id);
                    },
                    error: (err: HttpErrorResponse): void => {
                        console.log(err);
                    }
                })
        )
    }

    public update(editorial: IEditorialDTO, id: number): void {
        this.subscriptions.push(
            this._editorialServ.update(editorial, id)
                .subscribe({
                    next: (value): void => {
                        console.log(value)
                        alert('Se ha actualizado con exito');
                    },
                    error: (err: HttpErrorResponse): void => {
                        console.log(err);
                    }
                })
        )
    }

    public findById(id: number): void {
        this.subscriptions.push(
            this._editorialServ.findById(id)
                .subscribe({
                    next: (data: IEditorial) => {
                        this.editorialDto = data;
                        this.onClearListEditorial();
                        this.listEditorial.push(this.editorialDto);
                        this.dataSource = new MatTableDataSource<IEditorial>(this.listEditorial)
                        this.totalElement = this.listEditorial.length;
                    },
                    error: (err: HttpErrorResponse) => {
                        console.log(err);
                    }
                })
        )
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
        console.log(this.subscriptions);
    }
}
