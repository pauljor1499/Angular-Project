import { Component, OnInit } from '@angular/core';
import { Employee } from '../Classes/Employee';
import { Location } from '@angular/common';
import { EmployeeDatabaseService } from '../employee-database.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
  providers: [EmployeeDatabaseService],
})
export class ListEmployeeComponent implements OnInit {
  constructor(
    private emp_service: EmployeeDatabaseService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.fetchProductData();
    this.totalEmp();
  }

  //Instances
  employeeList: Employee[] = [];

  fetchProductData() {
    this.employeeList = this.emp_service.getEmployeeList();
  }

  onSearch(my_value: any) {
    this.emp_service.searchEmpByID(my_value);
  }

  total_emp = '';
  totalEmp() {
    this.total_emp = this.emp_service.countEmployee();
  }

  navigateBack() {
    this.location.back();
  }
}
