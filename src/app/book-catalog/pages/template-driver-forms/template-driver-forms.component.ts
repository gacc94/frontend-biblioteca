import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-template-driver-forms',
    templateUrl: './template-driver-forms.component.html',
    styleUrls: ['./template-driver-forms.component.scss']
})
export class TemplateDriverFormsComponent {
    public captureFile: Array<any> = [];
    previewImage:any;

    user = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: ''
    };

    onSubmit(form: NgForm) {
        console.log(form.value);
    }

    validations(field: any) {
        console.log(field.control.value);
        return field;

    }
    changeFile(event: Event):void {
        // console.log(event);
        // let inputFile = (<HTMLInputElement>event.target);
        // let listFile:FileList | null = inputFile.files
        // let nameFile;
        // let sizeFile;
        // const reader = new FileReader();
        // if(listFile){
        //     nameFile = listFile[0].name;
        //     sizeFile = `${Math.round(listFile[0].size / 1024)} MB`;
        //     reader.readAsDataURL(listFile[0]);
        // }
        // this.captureFile.push(nameFile);
        // console.log({event, nameFile});
        // console.log(this.captureFile);
        // console.log({sizeFile})
        //
        // reader.onload = (ev) => {
        //     const preview = reader.result as string;
        //     this.previewImage = preview;
        //     console.log(ev.target?.result)
        // };

    }
}
