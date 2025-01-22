import { Component , Input} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';


import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-confirm-delete',
  imports: [MatDialogModule , MatCardModule, MatDialogModule,  MatButtonModule],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css'
})
export class ConfirmDeleteComponent {
  @Input() title = 'Confirmar acción';
  @Input() message = '¿Está seguro?';
  private modalInstance: any;

  open(): void {
    const modalElement = document.getElementById('confirmDeleteModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();
    } else {
      console.error('Modal element not found');
    }
  }

  close(result: boolean): void {
    this.modalInstance.hide();
    // Notifica al componente padre el resultado
    const event = new CustomEvent('confirmAction', { detail: result });
    window.dispatchEvent(event);
  }
}
