import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor() {
    }

    public loading(text: string): void {
        Swal.fire({
            showConfirmButton: false,
            showCloseButton: false,
            showCancelButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            loaderHtml: `<!--<img src="assets/icons/loading.svg" alt="loading" loading="lazy">-->`,
            footer: `<p>${text}</p>`,
            width: 312
        }).then();
        Swal.showLoading()
    }

    public close(): void {
        Swal.close();
    }

    public notification(title: string, icon: any = 'success'): void {
        Swal.fire({
            position: "center",
            icon,
            title,
            showConfirmButton: true,
        }).then()
    }

    public question(
        tittle: string,
        subTitle: string,
        showConfirmButton: boolean,
        showCancelButton: boolean,
        btnConfirmText: string,
        btnCancelText: string,
        image = 'assets/icons/library.svg'
    ): Promise<any> {
        return new Promise((resolve) => {
            const swalPersonalizado = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-confirmation mr-2',
                    cancelButton: 'btn btn-cancel',
                },
                buttonsStyling: false,
            });
            swalPersonalizado
                .fire({
                    html: `<p>${tittle}.</p> `,
                    imageUrl: image,
                    text: subTitle,
                    showConfirmButton: showConfirmButton,
                    showCloseButton: false,
                    showCancelButton: showCancelButton,
                    focusConfirm: true,
                    confirmButtonText: btnConfirmText,
                    cancelButtonText: btnCancelText,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    width: 312,
                })
                .then((result) => {
                    console.log(result);
                    if (result.isConfirmed) {
                        resolve(true);
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel ||
                        result.dismiss === Swal.DismissReason.close
                    ) {
                        resolve(false);
                    }
                });
        });
    }
}
