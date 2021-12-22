import { Injectable } from '@angular/core';
import { Employee } from './Classes/Employee';
import { EMPLOYEELIST } from './Classes/EmployeeList';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDatabaseService {
  constructor(
    private location: Location,
    private toaster: ToastrService,
    private router: Router
  ) {}

  //DATABASE
  //Viewing List of Employee
  getEmployeeList(): Employee[] {
    return EMPLOYEELIST;
  }

  //Add new Employee
  addEmployee(newEmployee: Employee) {
    EMPLOYEELIST.push(newEmployee);
    this.toaster.success('Employee successfully added.');
    // this.location.back;
  }

  //Viewing Employee Details
  getEmployeeByID(page_id: String) {
    const emp = EMPLOYEELIST.find((s) => s.emp_id === page_id);
    return emp;
  }

  //Update Employee
  updateEmployee(page_id: any, updatedEmployee: Employee) {
    let index: number = EMPLOYEELIST.findIndex((s) => s.emp_id === page_id);
    if (index !== -1) {
      EMPLOYEELIST.splice(index, 1, updatedEmployee);
      this.toaster.success('Employee successfully updated.');
      this.location.back();
    } else {
    }
  }

  //Delete Employee
  deleteEmployeeByID(page_id: any) {
    let index: number = EMPLOYEELIST.findIndex((s) => s.emp_id === page_id);
    if (index !== -1) {
      EMPLOYEELIST.splice(index, 1);
      this.toaster.success('Employee successfully deleted.');
      this.location.back();
    } else {
    }
  }

  //Search Employee
  searchEmpByID(search_id: string) {
    const emp = EMPLOYEELIST.find((s) => s.emp_id === search_id);
    if (emp?.emp_id == search_id) {
      this.router.navigate(['/employee_list/' + search_id]);
    } else {
      this.router.navigate(['/employee_list/' + search_id]);
      // this.toastr.error('Invalid search input!');
    }
  }

  showEmpDetails(search_id: string) {
    const emp = EMPLOYEELIST.find((s) => s.emp_id === search_id);
    if (emp?.emp_id == search_id) {
      return true;
    } else {
      return false;
    }
  }

  countEmployee() {
    let counter = 0;
    for (let i = 0; i < EMPLOYEELIST.length; i++) {
      counter++;
    }
    return counter + '';
  }
}
