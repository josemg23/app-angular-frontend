import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subscription } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { UsersService } from '../../services/users.service';
import {
  DepartmentInterface,
  PositionInterface,
  UserInterface,
  UserInterfaceResponse,
} from '../interfaces/userinterface';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddUserComponent } from '../add-user/add-user.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare , faTrash } from '@fortawesome/free-solid-svg-icons';

declare var bootstrap: any;
@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatTableModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    FontAwesomeModule,
    ConfirmDeleteComponent,
    AddUserComponent
],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private dialog: MatDialog, private service: UsersService) {}



  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  userList: UserInterfaceResponse[] = [];
  departments: any[] = [];
  positions: any[] = [];
  dataSource!: MatTableDataSource<UserInterfaceResponse>;
  displayedColumns: string[] = [
    'id',
    'username',
    'first_name',
    'middle_name',
    'last_name',
    'middle_last_name',
    'email',
    'department_id',
    'position_id',
    'action',
  ];
  subscription: Subscription = new Subscription();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(ConfirmDeleteComponent) confirmDeleteComponent!: ConfirmDeleteComponent;
  @ViewChild(AddUserComponent) addUserComponent!: AddUserComponent;
  ngOnInit() {
    this.getAllUsers();
    this.getAlldepartments();
    this.getAllPositions();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getAllUsers() {
    let sub = this.subscription.add(
      this.service.getAllUsers().subscribe((data: UserInterface[]) => {
        this.userList = data;

        this.dataSource = new MatTableDataSource<UserInterface>(this.userList);
        this.dataSource.paginator = this.paginator;
      })
    );
    this.subscription.add(sub);
  }



  OpenPoopUp(id: number) {

    this.addUserComponent.dialogData = { id: id } as UserInterface;
    this.addUserComponent.ngOnInit(); 
    this.addUserComponent.open();

    this.addUserComponent.modalClosed.subscribe(() => {
      this.getAllUsers();
    });
  }


  addUser() {
    this.OpenPoopUp(0);
 }

  deleteUser(id: number) {
    this.confirmDeleteComponent.title = 'Eliminar registro';
    this.confirmDeleteComponent.message = '¿Estás seguro de eliminar este registro?';
    const confirmActionListener = (event: CustomEvent) => {
      if (event.detail === true) {
        let sub = this.service.deleteUser(id).subscribe((data) => {
          this.getAllUsers();
        });
        this.subscription.add(sub);
      }
      window.removeEventListener('confirmAction', confirmActionListener as EventListener);
    };
    window.addEventListener('confirmAction', confirmActionListener as EventListener);
    this.confirmDeleteComponent.open();

  }

  editUser(id: number) {
    this.OpenPoopUp(id);
  }

  getAlldepartments() {
    this.service.getDepartments().subscribe((data: DepartmentInterface[]) => {
      this.departments = data;
    });
  }

  getAllPositions() {
    this.service.getPositions().subscribe((data: PositionInterface[]) => {
      this.positions = data;
    });
  }
}
