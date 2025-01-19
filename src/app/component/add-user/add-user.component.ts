import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserInterface } from '../interfaces/userinterface';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-add-user',
  imports: [ MatCardModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent  implements OnInit{

  dialogData: UserInterface = {} as UserInterface;
  title = 'Registrar Usuario';
  buttonText = 'Registrar';
  isEdit = false;
  departments = [] as any[];
  positions = [] as any[];

  constructor(
    private service: UsersService,
    private ref: MatDialogRef<AddUserComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit(): void {

    this.getAlldepartments();
    this.getAllPositions();

    this.dialogData = this.data;
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
            last_name: _data.last_name,
            department_id: Number(_data.department_id),
            position_id: Number(_data.position_id),
          });
        }
      });
    }
  }

  empForm = new FormGroup({
    id: new FormControl(null as null | number),
    department_id: new FormControl(0, Validators.required),
    position_id: new FormControl(0, Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
  });


  saveUser() {

    if (this.empForm.valid) {
      let _data: UserInterface = {
        username: this.empForm.value.username as string,
        email: this.empForm.value.email as string,
        first_name: this.empForm.value.first_name as string,
        last_name: this.empForm.value.last_name as string,
        department_id: this.empForm.value.department_id as unknown as number,
        position_id: this.empForm.value.position_id as unknown as number,
        id: this.empForm.value.id as unknown as number
      };
      if (this.isEdit) {
        this.service.updateUser(_data).subscribe((data) => {
          this.service.getAllUsers().subscribe((data) => {});
          this.toastr.success('Employee updated successfully');
          this.closeModal();
        });
      } else {
        this.service.createUser(_data).subscribe((data) => {
          console.log('Employee added successfully', data);
          this.service.getAllUsers().subscribe((data) => {});
          this.toastr.success('Employee added successfully');
          this.closeModal();
        });
      }
    }
  }


  closeModal() {
    this.ref.close();
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
