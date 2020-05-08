import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Employee } from 'src/app/models/employee-model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  @Input() employee: Employee;
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService
      .getEmployee(id)
      .subscribe((employee) => (this.employee = employee));
  }

  onDelete(employee: Employee): void {
    const r = confirm('Delete employee?');
    if (r === true) {
      this.employeeService.deleteEmployee(employee).subscribe();
      this.location.back();
    }
  }
}
