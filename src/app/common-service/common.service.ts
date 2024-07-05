import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseUrl= 'https://localhost:7244/api/';

  constructor(private http: HttpClient) { }



  postEmployee(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}Employee`, data);
  }

  sendEmail(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}Employee/sendemail`, data)
  }

  getEmployee(){
    return this.http.get(`${this.baseUrl}Employee`);
  }


  // Get Issue Types

  getIssueTypes():Observable<any>{
     return this.http.get(`${this.baseUrl}Issues/issuetype`);
  }

  // Get Issue Sub Types

  getIssueSubTypes():Observable<any>{
     return this.http.get(`${this.baseUrl}Issues/issueSub`);
  }

  //Issues Api
  postIssues(data: any):Observable<any>{
     return this.http.post(`${this.baseUrl}Issues`, data);
  }

  getIssues():Observable<any>{
    return this.http.get(`${this.baseUrl}Issues`);
  }
}
