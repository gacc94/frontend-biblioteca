import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BibliotecaConstansUtil} from "@utils/biblioteca-constans.util";
import {UpperDirective} from "@directives/input/upper.directive";

@Component({
  selector: 'app-add-editorial',
  templateUrl: './add-editorial.component.html',
  styleUrls: ['./add-editorial.component.scss'],
})
export class AddEditorialComponent implements OnInit,AfterViewInit{

    public formEditorial!: FormGroup;
    private _action!: string;

    constructor(
        private _dialogRef: MatDialogRef<AddEditorialComponent>,
        @Inject(MAT_DIALOG_DATA) public data:any,
        private _fb: FormBuilder,
        private _cdRef:ChangeDetectorRef,
    ) { }

    ngOnInit():void{
        console.log(this.data)
        this.formEditorial = this._fb.group({
            id   : [''],
            name : ['', [Validators.required]],
        })
    }

    ngAfterViewInit():void {
        if(this.data){
            this.onEdit(this.data);
        }
        this._cdRef.detectChanges();
    }

    public onClose(): void {
        this._dialogRef.close(false);
    }

    public onSend(): void {
        this._dialogRef.close({descriptions: 'test message'})
    }

    public onSubmit():void {
        this._action = this.formEditorial.value.id
            ? BibliotecaConstansUtil.ACTION_UPDATE
            : BibliotecaConstansUtil.ACTION_ADD;

        this._dialogRef.close({
            id: this.formEditorial.value.id,
            editorial: this.formEditorial.value,
            action: this._action,
        })
    }

    public onEdit(element:any):void {
        this.formEditorial.setValue({
            id: element.id,
            name: element.name,
        });
    }

    public onDisabled():boolean {
        return this.formEditorial.invalid;
    }

}
