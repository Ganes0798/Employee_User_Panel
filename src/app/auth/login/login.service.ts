import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  apiUrl = 'https://localhost:7244/api/';

  constructor(private http: HttpClient, private route: Router) { }



  loginAsUser(user: any): Observable<any>{
    return this.http.post(`${this.apiUrl}Employee/employeelogin`, user);
  }

  get isUserLoggedIn(){
    const data = localStorage.getItem('token');
    return data ? true : false;
  }

LogoutAdmin(){
    localStorage.clear();
  this.route.navigate(['/login']);
}


}