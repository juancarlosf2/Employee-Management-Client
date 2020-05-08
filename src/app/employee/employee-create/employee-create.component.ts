import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Employee } from '../../models/employee-model';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})
export class EmployeeCreateComponent implements OnInit {
  employeeForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      firstname: '',
      lastname: '',
      email: '',
      phone: +'',
      notes: '',
    });
  }

  ngOnInit() {}

  onSubmit(employeeData: Employee): void {
    this.employeeService.createEmployee(employeeData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
