import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObject : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd! : boolean;
  showUpdate !:boolean;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      fullName: [''],
      email: [''],
      mobile: [''],
      job: [''],
      department: ['']
    })
    this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObject.fullName = this.formValue.value.fullName;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.mobile = this.formValue.value.mobile;
    this.employeeModelObject.job = this.formValue.value.job;
    this.employeeModelObject.department = this.formValue.value.department;

    this.api.postEmployee(this.employeeModelObject).subscribe( res => {
      console.log(res);

      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    }, err => {
      alert("Unable to add a new employee. Message error: " + err)
    })
  }

  getAllEmployee(){
    this.api.getEmployee(this.api).subscribe( res => {
      this.employeeData = res;
    })
  }

  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id).subscribe(res => {
      this.getAllEmployee();
    })
  }

  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObject.id = row.id;
    this.formValue.controls['fullName'].setValue(row.fullName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['job'].setValue(row.job);
    this.formValue.controls['department'].setValue(row.department);
  }

  updateEmployeeDetails(){
    this.employeeModelObject.fullName = this.formValue.value.fullName;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.mobile = this.formValue.value.mobile;
    this.employeeModelObject.job = this.formValue.value.job;
    this.employeeModelObject.department = this.formValue.value.department;
    this.api.updateEmployee(this.employeeModelObject, this.employeeModelObject.id).subscribe( res => {

      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();

    })
  }
}
