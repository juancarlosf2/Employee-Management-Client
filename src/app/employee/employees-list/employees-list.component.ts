import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee-model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit {
  employees: Employee[];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees(): void {
    this.employeeService
      .getEmployees()
      .subscribe((employee) => (this.employees = employee));
  }
  onDelete(employee: Employee): void {
    const r = confirm('Delete employee?');
    if (r === true) {
      this.employees = this.employees.filter((e) => e !== employee);
      this.employeeService.deleteEmployee(employee).subscribe();
    }
  }
}
