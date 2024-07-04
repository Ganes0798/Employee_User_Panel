import { Component, computed, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { LoginService } from './auth/login/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, MatSidenavModule, MatToolbarModule, MatIconModule,SidenavComponent, MatMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  loading: boolean = true;
  progress: number = 0; 
  isExpanded = true;
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');
  username: any;
  email: any;
  userId: any;

  constructor(private router: Router, private _loginService: LoginService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isExpanded = (event.url !== '/login');
      }

      this.loadName();
    }),
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }


  ngOnInit(): void {
    this.loadName();
  }

  loadName(){
    this.username = localStorage.getItem('un');
    this.email = localStorage.getItem('email');
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login'], { replaceUrl: false }).then(() => {
      window.history.pushState('/login', '', '/');
    });
  }


  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
