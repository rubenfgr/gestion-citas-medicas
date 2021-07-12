import { ErrorHandler } from '@angular/core';
import Swal from 'sweetalert2';
export class CustomErrorHandler implements ErrorHandler {
  handleError(error: any) {
    console.log(error);

    let text = '';

    if (error.error && error.error.message) {
      text = error.error.message;
    } else if (error.message) {
      text = error.message;
    } else {
      text = 'Error no reconocido, consulte con el administrador';
    }

    Swal.fire({
      title: '¡ERROR!',
      text,
      icon: 'error',
      confirmButtonText: 'Ok!',
    });
  }
}
