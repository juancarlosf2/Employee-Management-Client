import { Injectable } from '@angular/core';
import { Employee } from '../models/employee-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { MessageService } from './message.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesUrl = `${environment.apiUrl}/employees`;
  employees: Employee[];
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'aplication/json',
      Accept: 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.put<Employee>(url, employee, this.httpOptions).pipe(
      tap((_) => this.log(`Employee Updated succesfully with id = ${id}`)),
      catchError(this.handleError<Employee>('updateEmployee', employee))
    );
  }

  createEmployee(employeeData: Employee): Observable<Employee> {
    return this.http
      .post<Employee>(this.employeesUrl, employeeData, this.httpOptions)
      .pipe(
        tap((_) =>
          this.log(`Employee created successfully with id = ${employeeData.id}`)
        ),
        catchError(this.handleError<Employee>('CreateEmployee'))
      );
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl).pipe(
      tap((_) => this.log('fetched employees')),
      catchError(this.handleError<Employee[]>('getEmployees', []))
    );
  }

  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url, this.httpOptions).pipe(
      tap((_) => this.log('fetched employee')),
      catchError(this.handleError<Employee>(`getEmployee id= ${id}`))
    );
  }

  deleteEmployee(employee: Employee | number): Observable<Employee> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const url = `${this.employeesUrl}/${id}`;
    return this.http.delete<Employee>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted employee id= ${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      // TODO: send the error to remote logging infrastructure

      this.log(`${operation} failed: ${error.message}`);
      // TODO: better job of transforming error for user consumption

      return of(result as T);
      // Let the app keep running by returning an empty result.
    };
  }

  private log(message: string): void {
    this.messageService.add(`EmployeeService ${message}`);
    console.log(
      this.messageService.messages[this.messageService.messages.length - 1]
    );
  }
}
