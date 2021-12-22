import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../Classes/Employee';
import { EmployeeDatabaseService } from '../employee-database.service';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  constructor(
    private emp_service: EmployeeDatabaseService,
    private my_route: ActivatedRoute,
    private location: Location,
    private modal: NgbModal
  ) {}

  selectedEmployee: Employee | undefined;

  //Updated Employee
  updateEmployee: Employee = new Employee('', '', '', '', '', '', '', '', 0);

  //for remove
  // employeeList: Employee[] = [];

  //Employee ID
  send_id = '';

  //Modal Result
  closeResult = '';

  //Alert
  show_alert = false;

  //NgModel Initial Input
  emp_field_id: string = '';
  emp_field_Fname: string = '';
  emp_field_Mname: string = '';
  emp_field_Lname: string = '';
  emp_field_address: string = '';
  emp_field_contact: string = '';
  emp_field_office: string = '';
  emp_field_position: string = '';
  emp_field_salary: number = 0;

  //For showing employee details
  show_details: boolean = false;
  no_results: boolean = false;

  ngOnInit(): void {
    this.getEmployee();
    this.searchEmp();
    this.totalEmp();
  }

  getEmployee(): void {
    this.send_id = String(this.my_route.snapshot.paramMap.get('page_id'));
    this.selectedEmployee = this.emp_service.getEmployeeByID(this.send_id);
  }

  updateEmp() {
    this.updateEmployee = new Employee(
      this.emp_field_id,
      this.emp_field_Fname,
      this.emp_field_Mname,
      this.emp_field_Lname,
      this.emp_field_address,
      this.emp_field_contact,
      this.emp_field_office,
      this.emp_field_position,
      this.emp_field_salary
    );

    this.emp_service.updateEmployee(this.send_id, this.updateEmployee);

    this.updateEmployee = new Employee('', '', '', '', '', '', '', '', 0);

    this.emp_field_id = '';
    this.emp_field_Fname = '';
    this.emp_field_Mname = '';
    this.emp_field_Lname = '';
    this.emp_field_address = '';
    this.emp_field_contact = '';
    this.emp_field_office = '';
    this.emp_field_position = '';
    this.emp_field_salary = 0;
  }

  //Reset for Update Modal
  resetFields() {
    this.emp_field_id = '';
    this.emp_field_Fname = '';
    this.emp_field_Mname = '';
    this.emp_field_Lname = '';
    this.emp_field_address = '';
    this.emp_field_contact = '';
    this.emp_field_office = '';
    this.emp_field_position = '';
    this.emp_field_salary = 0;
  }

  removeEmployee(): void {
    this.emp_service.deleteEmployeeByID(this.send_id);
  }

  searchEmp(): void {
    if (this.emp_service.showEmpDetails(this.send_id)) {
      this.show_details = true;
      this.no_results = false;
    } else {
      this.show_details = false;
      this.no_results = true;
    }
  }

  total_emp = '';
  totalEmp() {
    this.total_emp = this.emp_service.countEmployee();
  }

  navigateBack() {
    this.location.back();
  }

  //Modal
  open(content: any) {
    // this.closeResult = 'sample';
    this.modal
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          //DELETE AND NO ARE FOR DELETE MODAL
          //UPDATE AND CANCEL ARE FOR DELETE MODAL
          if (result == `yes`) {
            this.removeEmployee();
            // this.closeResult = 'yes';
          } else if (result == 'no') {
            // this.closeResult = 'no';
          } else if (result == 'update') {
            this.updateEmp();
            // this.closeResult = 'save';
          } else if (result == 'cancel') {
            this.show_alert = false;
            this.resetFields();
            // this.closeResult = 'cancel';
          } else {
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
      this.emp_field_id == '' ||
      this.emp_field_Fname == '' ||
      this.emp_field_Mname == '' ||
      this.emp_field_Lname == '' ||
      this.emp_field_address == '' ||
      this.emp_field_contact == '' ||
      this.emp_field_office == '' ||
      this.emp_field_position == '' ||
      this.emp_field_salary == null
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
}
