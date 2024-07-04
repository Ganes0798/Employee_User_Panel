import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonService } from '../../common-service/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatSidenavModule, MatIconModule, MatFormFieldModule,ReactiveFormsModule, MatInputModule, MatButtonModule,MatSelectModule, CommonModule, MatOptionModule, MatAutocompleteModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'password', 'role', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('drawer') drawer!: MatDrawer;
    
  userForm:any;
  options: any;
  button_text: any;
  drawer_title: any;


  constructor(private _formBuilder: UntypedFormBuilder, private _commonService: CommonService){}




  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      emloyeeFirstName: ['', Validators.required],
      employeeLastName: ['', Validators.required],
      employeeEmail: ['', Validators.required],
      employeePassword: ['', Validators.required],
      employeeRole: ['', Validators.required]
    });
  }



  submit(form_type: any){
    
    this.drawer.open();

   

    if(form_type == 'add')
    {
      this.button_text = 'Add';
      this.drawer_title = 'Add User';
      // this.addUserForm();
    }
    // else if (form_type == 'update')
    // {
    //   this.button_text = 'Update';
    //   this.drawer_title = 'Update User';
    // }
    // else
    // {
    //   this.button_text = false;
    //   this.drawer_title = 'View User';
    // }
}

formSubmit(){
  if(this.userForm.valid)
  {
 
  }
}


  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 10;
  }


}
