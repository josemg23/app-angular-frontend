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
  DepartmentInterfaceResponse,
  PositionInterface,
  UserInterface,
} from '../interfaces/userinterface';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddUserComponent } from '../add-user/add-user.component';

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
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private dialog: MatDialog, private service: UsersService) {}

  userList: UserInterface[] = [];
  departments: any[] = [];
  positions: any[] = [];
  dataSource!: MatTableDataSource<UserInterface>;
  displayedColumns: string[] = [
    'id',
    'username',
    'first_name',
    'last_name',
    'email',
    'department_id',
    'position_id',
    'action',
  ];
  subscription: Subscription = new Subscription();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
    this.dialog.open(AddUserComponent , {
      width: '50%',
      exitAnimationDuration: '900ms',
      enterAnimationDuration: '900ms',
      data: {
        id: id,

      }
    }).afterClosed().subscribe((data) => {
      this.getAllUsers();
    });
  }


  addUser() {
    this.OpenPoopUp(0);
 }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      let sub = this.service.deleteUser(id).subscribe((data) => {
        this.getAllUsers();
      });
      this.subscription.add(sub);

    }
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
