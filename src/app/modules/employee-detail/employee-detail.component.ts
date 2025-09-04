import { Component, OnInit } from '@angular/core';
import { employeeList } from '../employee-list/employees.type';
import { EmployeeService } from './employee-detail.service';
import { Router } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss',
  providers: [DatePipe, CurrencyPipe],
})
export class EmployeeDetailComponent implements OnInit {
  employeeData!: employeeList | null;

  constructor(
    private employeeService: EmployeeService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.employeeService.employeeData$.subscribe((data) => {
      if (data == null) {
        data = this.employeeService.loadFromStorage();
      }
      this.employeeData = data;
    });
  }

  onBack(): void {
    localStorage.removeItem('employeeData');
    this._router.navigate(['./employee-list']);
  }
}
