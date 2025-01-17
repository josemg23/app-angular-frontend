import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DepartmentInterface, DepartmentInterfaceResponse, PositionInterface, UserInterface } from '../component/interfaces/userinterface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http:HttpClient) { }


  getAllUsers () {
    return this.http.get<UserInterface[]>(`${this.apiUrl}/users`);
  }

  getIdUser(id: number) {
    return this.http.get<UserInterface>(`${this.apiUrl}/users/${id}`);
  }



  getDepartments() {
    return this.http.get<DepartmentInterface[]>(`${this.apiUrl}/departments`);
  }

  getPositions() {
    return this.http.get<PositionInterface[]>(`${this.apiUrl}/positions`);
  }

  createUser(data: UserInterface) {
    return this.http.post(`${this.apiUrl}/users`, data);
  }

  updateUser(data : UserInterface){
    return this.http.put(`${this.apiUrl}/users/${data.id}`, data);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

}
