import { Component, OnInit } from '@angular/core';
import { Employee } from '../Classes/Employee';
import { EmployeeDatabaseService } from '../employee-database.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  providers: [EmployeeDatabaseService],
})
export class AddEmployeeComponent implements OnInit {
  constructor(
    private emp_service: EmployeeDatabaseService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchEmployeeData();
    this.totalEmp();
  }

  //Instances
  employeeList: Employee[] = [];

  //New Employee
  newEmployee: Employee = new Employee('', '', '', '', '', '', '', '', 0);

  //Modal
  closeResult = '';

  //show alert
  show_alert = false;

  add_newEmp() {
    if (
      this.newEmployee.emp_id == '' ||
      this.newEmployee.emp_first_name == '' ||
      this.newEmployee.emp_middle_name == '' ||
      this.newEmployee.emp_last_name == '' ||
      this.newEmployee.emp_address == '' ||
      this.newEmployee.emp_contact_number == '' ||
      this.newEmployee.emp_office == '' ||
      this.newEmployee.emp_position == '' ||
      this.newEmployee.emp_salary == null
    ) {
      this.show_alert = true;
    } else {
      this.emp_service.addEmployee(this.newEmployee);
      this.newEmployee = new Employee('', '', '', '', '', '', '', '', 0);

      this.show_alert = false;
    }
  }

  resetFields() {
    this.newEmployee.emp_id = '';
    this.newEmployee.emp_first_name = '';
    this.newEmployee.emp_middle_name = '';
    this.newEmployee.emp_last_name = '';
    this.newEmployee.emp_address = '';
    this.newEmployee.emp_contact_number = '';
    this.newEmployee.emp_office = '';
    this.newEmployee.emp_position = '';
    this.newEmployee.emp_salary = 0;

    this.show_alert = false;
  }

  fetchEmployeeData() {
    this.employeeList = this.emp_service.getEmployeeList();
  }

  //Modal
  open(content: any) {
    // this.closeResult = 'sample';
    this.modal
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (`${result}` == `add`) {
            this.add_newEmp();
            this.totalEmp();
            this.closeResult = 'add';
          } else {
            this.closeResult = 'cancel';
            this.show_alert = false;
            this.resetFields();
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.show_alert = false;
          this.resetFields();
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  validateFields() {
    if (
      this.newEmployee.emp_id == '' ||
      this.newEmployee.emp_first_name == '' ||
      this.newEmployee.emp_middle_name == '' ||
      this.newEmployee.emp_last_name == '' ||
      this.newEmployee.emp_address == '' ||
      this.newEmployee.emp_contact_number == '' ||
      this.newEmployee.emp_office == '' ||
      this.newEmployee.emp_position == '' ||
      this.newEmployee.emp_salary == null
    ) {
      // this is my toast for error
      this.show_alert = true;
      return false;
    } else {
      //this is my toast saved
      this.show_alert = false;
      return true;
    }
  }

  total_emp = '';
  totalEmp() {
    this.total_emp = this.emp_service.countEmployee();
  }
}
