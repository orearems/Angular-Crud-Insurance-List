import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  education: string[] =[
    'SSCE',
    'Diploma',
    'Undergraduate',
    'Graduate',
    'Post Graduate',
  ]

  package: string[] =[
    'Gold',
    'Silver',
    'Bronze',
  ]

  constructor(
    public _fb: FormBuilder,
    public _empService: EmployeeService,
    public _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _coreService: CoreService
    ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education:'',
      company: '',
      experience: '',
      package: '',
    })
  }

  ngOnInit(): void{
    this.empForm.patchValue(this.data)
  }

  onFormSubmit() {
    if(this.empForm.valid) {
      if (this.data) {
        this._empService.updateEmployee(this.data.id, this.empForm.value)
        .subscribe({
          next: (val: any)=>{
            this._coreService.openSnackBar('Employee info updated!')
            this._dialogRef.close(true);
          },
          error:(err:any)=>{
          console.error(err)
        }
      })



      }
      else{
          this._empService.addEmployee(this.empForm.value).subscribe({
            next: (val: any)=>{
              this._coreService.openSnackBar('Employee added successfully!')
              this._dialogRef.close(true);

        },
        error:(err:any)=>{
          console.error(err)
        }
      })
    }
        }
  }

}
