export class Employee {
  //attributes
  emp_id: string;
  emp_first_name: string;
  emp_middle_name: string;
  emp_last_name: string;
  emp_address: string;
  emp_contact_number: string;
  emp_office: string;
  emp_position: string;
  emp_salary: number;

  constructor(
    cons_id: string,
    cons_Fname: string,
    cons_Mname: string,
    cons_Lname: string,
    cons_address: string,
    cons_contact: string,
    cons_office: string,
    cons_position: string,
    cons_salary: number
  ) {
    this.emp_id = cons_id;
    this.emp_first_name = cons_Fname;
    this.emp_middle_name = cons_Mname;
    this.emp_last_name = cons_Lname;
    this.emp_address = cons_address;
    this.emp_contact_number = cons_contact;
    this.emp_office = cons_office;
    this.emp_position = cons_position;
    this.emp_salary = cons_salary;
  }
}
