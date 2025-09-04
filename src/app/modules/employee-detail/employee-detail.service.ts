import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { employeeList } from '../employee-list/employees.type';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private _employeeDate: BehaviorSubject<employeeList | null> =
    new BehaviorSubject<employeeList | null>(null);

  get employeeData$(): Observable<employeeList | null> {
    return this._employeeDate.asObservable();
  }

  setEmployeeDate(data: employeeList): void {
    this._employeeDate.next(data);
    localStorage.setItem('employeeData', JSON.stringify(data));
  }

  loadFromStorage(): employeeList | null {
    const data = localStorage.getItem('employeeData');
    return data ? JSON.parse(data) : null;
  }
}
