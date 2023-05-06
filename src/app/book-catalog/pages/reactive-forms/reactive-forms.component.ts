import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
export interface DataForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    fileImage: Array<string>;
}
@Component({
    selector: 'app-reactive-forms',
    templateUrl: './reactive-forms.component.html',
    styleUrls: ['./reactive-forms.component.scss']
})
export class ReactiveFormsComponent implements OnInit {
    captureFile: Array<any> = [];
    previewImage: any;
    dataForm!: DataForm;
    formReactive:FormGroup = this._fb.group({
        name: ['', [Validators.required]],
        email: ['',[Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required],
        gender: ['', Validators.required],
        fileImage: ['',],
    })

    get nameField():AbstractControl {
        return this.formReactive.controls['name'];
    }
    get emailField():AbstractControl {
        return this.formReactive.controls['email'];
    }
    get passwordField():AbstractControl {
        return this.formReactive.controls['password'];
    }
    get genderField(): AbstractControl {
        return this.formReactive.controls['gender'];
    }
    get confirmPasswordField():AbstractControl{
        return this.formReactive.controls['confirmPassword'];
    }

    constructor(
        private _fb: FormBuilder,
    ) {
    }

    ngOnInit(): void {
    }

    onSubmit(event: any): void {
        if(!this.formReactive.valid){
            return;
        }
        this.dataForm = {
            confirmPassword: this.confirmPasswordField.value,
            email: this.emailField.value,
            gender: this.genderField.value,
            name: this.nameField.value,
            password: this.passwordField.value,
            fileImage: this.captureFile,
        }
        console.log({DOCUMENTOSFILE: this.dataForm});


    }

    changeFile(event: Event): void {
        let inputFile = (<HTMLInputElement>event.target);
        let listFile: FileList | null = inputFile.files
        let nameFile;
        let sizeFile;
        const reader = new FileReader();
        if (listFile) {
            nameFile = listFile[0].name;
            sizeFile = `${Math.round(listFile[0].size / 1024)} MB`;
            reader.readAsDataURL(listFile[0]);
        }
        this.captureFile.push(nameFile);
        console.log({event, nameFile});
        console.log(this.captureFile);
        console.log({sizeFile})

        reader.onload = (ev) => {
            const preview = reader.result as string;
            this.previewImage = preview;
            console.log(ev.target?.result)
        };

    }

    protected readonly name = name;
}
