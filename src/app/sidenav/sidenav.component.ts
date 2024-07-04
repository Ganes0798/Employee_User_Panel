import { Component, Input, ViewChild, computed, signal } from '@angular/core';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export type menuItems = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule ,MatSidenavModule,MatToolbarModule,MatStepperModule,MatIconModule,  MatListModule, MatMenuModule,RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {


  sidenavCollapsed = signal(false);
  @Input() set collapsed (val: boolean)
  {
    this.sidenavCollapsed.set(val);
  }
  menuItems = signal<menuItems[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: '/dashboard'
    },
    {
      icon: 'store',
      label: 'Tasks List',
      route: '/task'
    },
    {
      icon: 'error',
      label: 'Issues',
      route: '/issue',
    }
    // {
    //   icon: 'store',
    //   label: 'Products',
    //   route: '/products'
    // },
    // {
    //   icon: 'shopping_cart',
    //   label: 'Orders',
    //   route: '/orders'
    // },

  ]);

  profilePic = computed(() => this.sidenavCollapsed() ? '32' : '100');
 
}
