import { SwalIconType } from '../enums/swal.enums';

export interface ISwalData {
  title: string;
  text: string;
  icon: SwalIconType;
  confirmButtonText: string;
}
