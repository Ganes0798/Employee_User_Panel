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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-issue',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,MatSidenavModule, MatIconModule, MatFormFieldModule,ReactiveFormsModule, MatInputModule, MatButtonModule,MatSelectModule, CommonModule, MatOptionModule, MatAutocompleteModule, MatDatepickerModule],
  templateUrl: './issue.component.html',
  styleUrl: './issue.component.scss'
})
export class IssueComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'password', 'action'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('drawer') drawer!: MatDrawer;
  button_text: any;
  drawer_title: any;
  issueForm:any;
  userid: any;
  issuetype: any[] = [];
  issueSub: any[] = [];
  filteredIssueSub: any[] = [];
  urgencyLevel: any;
  

  constructor(private _formBuilder: UntypedFormBuilder, private _commonService: CommonService){ this.formData();
     this.getIssue()
  }

  ngOnInit(): void {
    this.formData();
    this.getIssuesType();
    this.getIssueSub();
    this.userid = localStorage.getItem('id');
    this.getIssue();
  console.log(this.userid);

    this.urgencyLevel = [{id: 1, urgencyName: "Low"}, {id: 2, urgencyName: "Medium"}, {id: 3, urgencyName: "High"}]
  }

  getIssuesType(){
    this._commonService.getIssueTypes().subscribe({
      next: (response: any) => {
          this.issuetype = response.result;
      },
      error: (err:any) => {

      }
    })
  }

  // Get Api

  getIssue(){
    this._commonService.getIssues().subscribe({
      next:(response:any) => {
         if(response.code == 200 && response.success == true)
         {
           this.dataSource = response.result;
         }
      },
      error: (err:any) => {

      }
    })
  }


  onIssueTypeSelected(issueTypeId: any) {
    console.log(issueTypeId)
    this.filteredIssueSub = this.issueSub.filter((sub:any) => sub.issueFkId === issueTypeId);
  }

    getTitle(bookId: string) {
    return this.issuetype.find((roles:any) => roles.id === bookId).issueName!;
  }

  // getTitleSub(Id: string) {
  //   return this.issueSub.find((role:any) => role.id === Id).filteredIssueSub.issueSubName;
  // }

  getSub(Id: any) {
   return this.issueSub.find((sub:any) => sub.subId === Id).issueSubName!;
  }

  getIssueSub(){
    this._commonService.getIssueSubTypes().subscribe({
      next:(response:any) => {
          this.issueSub = response.result;
          console.log(this.issueSub)
      },
      error: (err:any) => {

      }
    })
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
    const jsonInput = {
      "employeeFkId": this.userid,
      "issueTypeFk": data.issueType,
      "issueSubFk": data.issue,
      "issueDescription": data.issueDescription,
      "issueDate": data.issueDate,
      "urgencyLevel": data.urgencyLevel
    }

    this._commonService.postIssues(jsonInput).subscribe({
      next: (response: any) => {
        if(response.code == 200 && response.success == true)
        {
          Swal.fire({
            title: response.message + "!",
            text: "Click Ok to Continue!",
            icon: "success"
          });
        }
      },
      error: (err:any) => {

      }
    })
  }



  submit(form_type: any){
    
    this.drawer.open();

    if(form_type == 'add')
    {
      this.button_text = 'Add';
      this.drawer_title = 'Add Issues';
      this.formData();
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
  if(this.issueForm.valid)
  {
    if(this.button_text == 'Add')
    {
      this.addissues(this.issueForm.value)
    }
  }
}
}
