import { Component, OnInit } from '@angular/core';
import { EmployeeDatabaseService } from '../employee-database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private emp_service: EmployeeDatabaseService) {}

  ngOnInit(): void {
    this.totalEmp();
  }

  total_emp = '';
  totalEmp() {
    this.total_emp = this.emp_service.countEmployee();
  }

  //Anchor
  scrollIntoView(anchorHash: any) {
    setTimeout(() => {
      const anchor = document.getElementById(anchorHash);
      if (anchor) {
        anchor.focus();
        anchor.scrollIntoView();
      }
    });
  }
}
