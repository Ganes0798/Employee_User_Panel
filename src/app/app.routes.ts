import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [

    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},

    {
        path: 'dashboard',
        loadComponent: () => import('../app/pages/dashboard/dashboard.component').then(m => {
            return m.DashboardComponent
        })
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }