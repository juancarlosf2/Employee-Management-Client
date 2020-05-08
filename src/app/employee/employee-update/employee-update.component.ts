import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/models/employee-model';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css'],
})
export class EmployeeUpdateComponent implements OnInit {
  employeeForm: FormGroup;
  employee: Employee;
  id: number;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      notes: '',
    });
  }

  ngOnInit(): void {
    this.getEmployee();
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService
      .getEmployee(id)
      .subscribe((employee) => this.employeeForm.patchValue(employee));
  }

  onSubmit(employeeData: Employee): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.updateEmployee(id, employeeData).subscribe((res) => {
      this.router.navigateByUrl('/update-employee/' + id).then(() => {
        this.goBack();
      });
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
