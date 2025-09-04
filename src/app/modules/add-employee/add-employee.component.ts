import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, DropdownModule, ToastModule],
  providers: [DatePipe, MessageService],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent implements OnInit {
  addForm: FormGroup;
  maxDate: any;
  groupList: string[] = [
    'Admin',
    'User',
    'Guest',
    'Manager',
    'Assistant',
    'HR',
    'IT',
    'Division Head',
    'Department Head',
    'Legal',
  ];
  statusList: string[] = ['Active', 'Inactive', 'Pending'];

  constructor(
    private _formBuilder: FormBuilder,
    private _datePipe: DatePipe,
    private _router: Router,
    private messageService: MessageService,
  ) {
    this.addForm = this._formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      basicSalary: ['', Validators.required],
      group: [this.groupList[0], Validators.required],
      status: [this.statusList[0], Validators.required],
    });
  }

  ngOnInit(): void {
    const currentDate = new Date();
    this.maxDate = this._datePipe.transform(currentDate, 'yyyy-MM-dd');
  }

  numberOnly(event: string): void {
    const value = event.replace(/[^0-9]/g, '');

    const number = Number(value);
    event = number.toLocaleString('id-ID', {
      useGrouping: true,
      maximumFractionDigits: 0,
    });
    this.addForm.patchValue({ basicSalary: event });
  }

  onSubmit(): void {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }

    console.log(this.addForm.value);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Add Employee Success',
    });
  }

  onCancel(): void {
    this._router.navigate(['./employee-list']);
  }
}
