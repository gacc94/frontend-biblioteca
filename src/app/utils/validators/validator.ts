import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from "@angular/forms";
import {BibliotecaConstansUtil} from "@utils/biblioteca-constans.util";
import {EditorialService} from "@services/editorial.service";
import {map, Observable, of} from "rxjs";

export const validatorCharacterSpecial = (): ValidatorFn => {

    return ( control: AbstractControl ): ValidationErrors | null => {
        const text: RegExp = BibliotecaConstansUtil.NOT_ALLOWED_VALUES;
        const value = control.value;
        return text.test(value) ? { isError: true } : null;
    }
}

export const validatorPasswordMatch = (): ValidatorFn =>{

    return ( control: AbstractControl ): ValidationErrors |  null => {
        const newPassword = control.parent?.get('newPassword')?.value
        const repitNewPassword = control.parent?.get('repiteNewPassword')?.value;
        return (newPassword !== repitNewPassword) ? { passwordMatch: true } : null;

    }
}

// export const validatorIsbnAsync = (editorialService: EditorialService): AsyncValidatorFn => {
//     return ( control: AbstractControl ): Observable<ValidationErrors | null> => {
//         return editorialService.existByIsbn(control.value).pipe(
//             map((data: boolean) => {
//                 return data ? { isbnError: true} : null;
//             })
//         )
//
//     }
// }