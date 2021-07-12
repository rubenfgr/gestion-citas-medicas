import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ISwalData } from '../interfaces/swal.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SweetAlertService {
  constructor() {}

  fire(swalData: ISwalData): void {
    Swal.fire(swalData);
  }
}
