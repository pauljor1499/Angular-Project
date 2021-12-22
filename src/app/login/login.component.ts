import { Component, OnInit } from '@angular/core';
import { EmployeeDatabaseService } from '../employee-database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private DBService: EmployeeDatabaseService) {}

  ngOnInit(): void {}
}
