import { Dialog } from '@angular/cdk/dialog';
import { Component, ViewChild, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CoreService } from './core/core.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = [
    "sn",
    "id",
    "firstName",
    "lastName",
    "email",
    "dob",
    "gender",
    "education",
    "company",
    "experience",
    "package",
    "action",
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public _dialog: MatDialog,
    public _empService: EmployeeService,
    public _coreService: CoreService
    ) {}

    ngOnInit(): void {
      this.getEmployeeList()
    }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getEmployeeList()
        }
      }
    })

  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource= new MatTableDataSource(res)
        this.dataSource.sort= this.sort
        this.dataSource.paginator = this.paginator

      },

      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
}

deleteEmployee(id: number){
  this._empService.deleteEmployee(id).subscribe({
    next: (res)=> {
      this._coreService.openSnackBar('Employee deleted!', 'done')
      this.getEmployeeList()

    },
    error: console.log,
  })
}

openEditForm(data: any) {
  const dialogRef = this._dialog.open(EmpAddEditComponent, {
    data,
  })

  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if(val) {
        this.getEmployeeList()
      }
    }
  })
}
}
