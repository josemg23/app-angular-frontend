import { Component, Inject, OnInit, Input, Output } from '@angular/core';
import { FormControl, FormGroup,  ReactiveFormsModule,  Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserInterface } from '../interfaces/userinterface';
import { UsersService } from '../../services/users.service';
import * as bootstrap from 'bootstrap';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-user',
  imports: [ MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
  CommonModule,
ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent  implements OnInit{


  @Input() dialogData: UserInterface = {} as UserInterface;
  @Input() title = 'Registrar Usuario';
  @Input() buttonText = 'Registrar';
  @Input() isEdit = false;
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();
  departments = [] as any[];
  positions = [] as any[];
  private modalInstance: any;



  empForm = new FormGroup({
    id: new FormControl(null as null | number),
    department_id: new FormControl(0, Validators.required),
    position_id: new FormControl(0, Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    middle_name: new FormControl('', Validators.required),
    middle_last_name: new FormControl('', Validators.required),
  });


  constructor(
    private service: UsersService,
  ) {}

  ngOnInit(): void {
    this.getAlldepartments();
    this.getAllPositions();

    if (this.dialogData.id) {
      this.title = 'Editar Usuario';
      this.buttonText = 'Actualizar';
      this.isEdit = true;
      this.service.getIdUser(this.dialogData.id).subscribe((item) => {
        let _data = item;
        if (_data != null) {
          this.empForm.setValue({
            id: _data.id,
            username: _data.username,
            email: _data.email,
            first_name: _data.first_name,
            middle_name: _data.middle_name,
            last_name: _data.last_name,
            middle_last_name: _data.middle_last_name,
            department_id: Number(_data.department_id),
            position_id: Number(_data.position_id),
          });
        }
      });
    } else {
      this.title = 'Registrar Usuario';
      this.buttonText = 'Registrar';
      this.isEdit = false;
      this.empForm.reset({
        id: null,
        department_id: 0,
        position_id: 0,
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        middle_last_name: ''
      });
    }
  }




  open(): void {
    const modalElement = document.getElementById('addUserModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
      this.modalInstance.show();

      if (!this.isEdit) {
        this.empForm.reset(
          {
            id: null,
            department_id: 0,
            position_id: 0,
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            middle_name: '',
            middle_last_name: ''
          }
        );

      }


    } else {
      console.error('Modal element not found');
    }
  }

  saveUser() {
    if (this.empForm.valid) {
      let _data: UserInterface = {
        username: this.empForm.value.username as string,
        email: this.empForm.value.email as string,
        first_name: this.empForm.value.first_name as string,
        middle_name: this.empForm.value.middle_name as string,
        last_name: this.empForm.value.last_name as string,
        middle_last_name: this.empForm.value.middle_last_name as string,
        department_id: this.empForm.value.department_id as unknown as number,
        position_id: this.empForm.value.position_id as unknown as number,
        id: this.empForm.value.id as unknown as number
      };
      if (this.isEdit) {
        this.service.updateUser(_data).subscribe((data) => {
          this.service.getAllUsers().subscribe((data) => {});
          this.closeModal();
        });
      } else {
        this.service.createUser(_data).subscribe((data) => {
          this.service.getAllUsers().subscribe((data) => {});
          this.closeModal();
        });
      }
    }
  }


  closeModal(): void {
    this.modalInstance.hide();
    this.modalClosed.emit();
  }

  getAlldepartments() {
      this.service.getDepartments().subscribe((data: any[]) => {
        this.departments = data;
      });
    }


    getAllPositions() {
      this.service.getPositions().subscribe((data: any[]) => {
        this.positions = data;
      });
    }






}
