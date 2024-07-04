import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CommonService } from '../../common-service/common.service';

@Component({
  selector: 'app-issue',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatSidenavModule, MatIconModule, MatFormFieldModule,ReactiveFormsModule, MatInputModule, MatButtonModule,MatSelectModule, CommonModule, MatOptionModule, MatAutocompleteModule, MatDatepickerModule],
  templateUrl: './issue.component.html',
  styleUrl: './issue.component.scss'
})
export class IssueComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'password', 'role', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('drawer') drawer!: MatDrawer;
  button_text: any;
  drawer_title: any;
  issueForm:any;
  userid: any;

  constructor(private _formBuilder: UntypedFormBuilder, private _commonService: CommonService){}

  ngOnInit(): void {
    this.formData();
    
  }


  formData(){
    this.issueForm = this._formBuilder.group({
      issueType: ['', Validators.required],
      issue: ['', Validators.required],
      issueDate: ['', Validators.required],
      issueDescription: ['', Validators.required],
      urgencyLevel: ['', Validators.required],

    })
  }

  //Add Issues

  addissues(data:any){
  this.userid = localStorage.getItem('id');
    const jsonInput = {
      "employeeFkId": this.userid,
      "issueTypeFk": data.issueType,
      "issueSubFk": data.issue,
      "issueDescription": data.issueDescription,
      "issueDate": data.issueDate,
      "urgencyLevel": data.urgencyLevel
    }

  }



  submit(form_type: any){
    
    this.drawer.open();

    if(form_type == 'add')
    {
      this.button_text = 'Add';
      this.drawer_title = 'Add Issues';
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
  // if(this.userForm.valid)
  // {
  //   if(this.button_text == 'Add')
  //   {
  //     this.addEmployee(this.userForm.value)
  //   }
  // }
}
}
