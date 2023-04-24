import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-template-driver-forms',
    templateUrl: './template-driver-forms.component.html',
    styleUrls: ['./template-driver-forms.component.scss']
})
export class TemplateDriverFormsComponent {
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
}
