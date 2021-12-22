import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { LoginComponent } from './login/login.component';

//content to view in the page
const routes: Routes = [
  //Create Home Page
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },

  //routerLinks
  { path: 'add_emp_page', component: AddEmployeeComponent },
  { path: 'employee_list', component: ListEmployeeComponent },

  //emp_list comp ---> prod_details comp
  { path: 'employee_list/:page_id', component: EmployeeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponent = [ListEmployeeComponent];
