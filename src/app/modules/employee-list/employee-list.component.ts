import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { employeeList } from './employees.type';
import { employeesData } from './data';
import { MessageService, SortEvent } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee-detail/employee-detail.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    ToastModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  providers: [MessageService],
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  @ViewChild('dt') dt!: Table;
  employees: employeeList[] = [...employeesData];
  initialValue: employeeList[] = [...employeesData];
  isSorted: boolean | null = null;
  filterValue: string = '';

  constructor(
    private messageService: MessageService,
    private employeeService: EmployeeService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    const savedSearch = localStorage.getItem('searchFilter');
    if (savedSearch) {
      this.filterValue = savedSearch;
    }
  }

  ngAfterViewInit(): void {
    if (this.filterValue) {
      this.dt.filterGlobal(this.filterValue, 'contains');
    }
  }

  customSort(event: SortEvent): void {
    if (this.isSorted == null || this.isSorted === undefined) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted == true) {
      this.isSorted = false;
      this.sortTableData(event);
    } else if (this.isSorted == false) {
      this.isSorted = null;
      this.employees = [...this.initialValue];
      this.dt.reset();
    }
  }

  sortTableData(event: any): void {
    event.data.sort((data1: any, data2: any) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  filterTable(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filterValue = input.value;
    this.dt.filterGlobal(input.value, 'contains');

    localStorage.setItem('searchFilter', input.value);
  }

  onDetail(employee: employeeList): void {
    this.employeeService.setEmployeeDate(employee);
    this._router.navigate(['./employee-detail']);
  }

  onEdit(): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'Edit notif',
      detail: 'edit',
    });
  }

  onDelete(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Delete notif',
      detail: 'delete',
    });
  }
}
