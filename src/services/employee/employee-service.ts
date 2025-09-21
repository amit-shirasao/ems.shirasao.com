import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from '../../interfaces/iemployee';
import { IEmployeeApiReturn } from '../../interfaces/iemployee-api-return';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private serviceUrl: string = 'http://localhost:3000/';
  // private serviceUrl: string = 'https://ems-api.shirasao.com/';

  constructor(private httpClient: HttpClient) {}

  public getAllEmployees(): Observable<IEmployeeApiReturn> {
    return this.httpClient.get<IEmployeeApiReturn>(this.serviceUrl);
  }

  public addEmployee(newEmployee: IEmployee): Observable<IEmployeeApiReturn> {
    return this.httpClient.post<IEmployeeApiReturn>(this.serviceUrl, newEmployee);
  }

  public updateEmployeeById(id: String, updatedEmployee: IEmployee): Observable<IEmployeeApiReturn> {
    return this.httpClient.put<IEmployeeApiReturn>(`${this.serviceUrl}${id}`, updatedEmployee);
  }

  public removeEmployeeById(id: String): Observable<IEmployeeApiReturn> {
    return this.httpClient.delete<IEmployeeApiReturn>(`${this.serviceUrl}${id}`);
  }
}
