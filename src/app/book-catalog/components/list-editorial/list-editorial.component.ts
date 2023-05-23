import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddEditorialComponent} from "../add-editorial/add-editorial.component";
import {EditorialService} from "@services/editorial.service";
import {IEditorial, IEditorialDTO} from "@models/editorial.model";
import {debounce, debounceTime, map, merge, Observable, startWith, Subscription, switchMap, tap} from "rxjs";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {HttpErrorResponse} from "@angular/common/http";
import {BibliotecaConstansUtil} from "@utils/biblioteca-constans.util";
import {CommonModule} from "@angular/common";
import {SharedModule} from "@shared/shared.module";
import {MaterialModule} from "@material/material.module";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FirstUpperPipe} from "@pipes/first-upper.pipe";
import {IPage} from "@models/page.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {successNotification} from "@utils/config/library.config";
import {AlertService} from "@services/alert.service";

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
    public filterEditorial: Observable<any> = new Observable<any>();

    myControl = new FormControl('');
    options: Array<IEditorial> = [];
    filteredOptions: Observable<string[]> = new Observable<string[]>();

    constructor(
        private _alertServ: AlertService,
        private _snackBar: MatSnackBar,
        private _dialog: MatDialog,
        private _editorialServ: EditorialService,
    ) {
    }

    ngOnInit() {
        this.title = 'Catalogo de Libros';
        this.columnsTable = ['id', 'name', 'selected'];
        console.log(this.listEditorial);

        this.myControl.valueChanges
            .pipe(
                debounceTime(400),
                startWith(''),
            ).subscribe({
            next: (value) => {
                const val = value?.trim().toLowerCase() ?? '';
                console.log(val.length);
                this.findByNameFilter(val);
            }
        });
    }

    // private _filter(value: string): string[] {
    //     const filterValue = value.toLowerCase();
    //
    //     return this.options.filter(option => option.toLowerCase().includes(filterValue));
    // }

    ngAfterViewInit(): void {
        this.findByName('', 0, 10)
        this.matSort.sortChange.subscribe(() => this._matPaginator.pageIndex = 0);
        merge(this.matSort.sortChange, this._matPaginator.page)
            .pipe(
                switchMap((resp: Sort | PageEvent) => {
                    this.loading('Cargando .....');
                    return this._editorialServ.findByName(
                        this.search ? this.search : '',
                        this._matPaginator.pageIndex,
                        this._matPaginator.pageSize
                    );
                }),
                map((data: IPage<IEditorial>) => {
                    this._alertServ.close();
                    this.totalElement = data.totalElements;
                    this._matPaginator.pageIndex = data.number;
                    this._matPaginator.pageSize = data.size;
                    return data.content;
                })
            )
            .subscribe({
                next: (data) => {
                    this.listEditorial = data;

                    console.log(data)
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
                        this.question(resp.editorial);
                        this.save(resp.editorial)
                    }
                }
            });
    }

    public findByName(name: string, page: number, size: number): void {
        this.loading('Cargando .....');
        this.subscriptions.push(
            this._editorialServ.findByName(name, page, size)
                .pipe(
                    map((resp: IPage<IEditorial>) => {
                        this.totalElement = resp.totalElements;
                        return resp.content;
                    }),
                )
                .subscribe({
                    next: (resp: Array<IEditorial>)=> {
                        this._alertServ.close();
                        this.listEditorial = resp;
                        // this.dataSource = new MatTableDataSource<IEditorial>(this.listEditorial);
                        // this.dataSource.paginator = this._matPaginator;
                        // this.totalElement = resp.totalElements;
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
        this.findByName('', 0, 10);
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
                        this.findById(value.id);
                        this._alertServ.notification(
                            'Se registro correctamente',
                            BibliotecaConstansUtil.VC_SUCCESS
                        )
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
        this.onClearListEditorial();
        this.subscriptions.push(
            this._editorialServ.findById(id)
                .subscribe({
                    next: (data: IEditorial) => {
                        this.listEditorial.push(data);
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

    public success(message: string) {
        successNotification(message, this._snackBar);
    }

    public loading(text: string): void {
        this._alertServ.loading(text);
    }

    public question(editorial: IEditorial): void {
        this._alertServ.question(
            'Desea registrar esta Editorial',
            '',
            true,
            true,
            'Acepta',
            'Cancelar')
            .then((data: boolean) => {
                console.log(data);
                if (data) {
                    this.save(editorial);
                }
            });
    }

    public findByNameFilter(name: string) {
         this._editorialServ.findByName(name, 0,10)
            .pipe(
                map((resp: IPage<IEditorial>) => resp.content),
            ).subscribe({
                next: (value) => {
                    this.options = value;
                }
            })
    }

    public onSearchFilter(event: Event): void {
        const target = (<HTMLInputElement>event.target).value;
        this._editorialServ.findByName(target, 0, 100)
            .subscribe({
                next: value => {
                }
            })

        this.filterEditorial.subscribe(value => console.log(value))
    }

    public delete(id: number): void {
        this._editorialServ.delete(id)
            .subscribe({
                next: (value) => {
                    console.log(value);
                    this.findByName('', 0, 10);
                    this._alertServ.notification('Se elimino con exito', BibliotecaConstansUtil.VC_SUCCESS);
                }
            })
    }

    public onConfirmDelete(id: number): void {
        this._alertServ.question(
            'Desea Eliminar esta Editorial',
            '',
            true,
            true,
            'Acepta',
            'Cancelar')
            .then((data: boolean) => {
                console.log(data);
                if (data) {
                    // this.save(editorial);
                    this.delete(id);
                }
            });

    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
        console.log(this.subscriptions);
    }
}
