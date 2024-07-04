import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/login/auth.guard';

export const routes: Routes = [

    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},

    {
        path: 'dashboard',
        loadComponent: () => import('../app/pages/dashboard/dashboard.component').then(m => {
            return m.DashboardComponent
        }),
        canActivate: [AuthGuard]
    },
    {
        path: 'task',
        loadComponent: () => import('./pages/task/task.component').then(m => {
            return m.TaskComponent
        })
    },
    {
        path: 'issue',
        loadComponent: () => import('../app/pages/issue/issue.component').then(m => {
            return m.IssueComponent
        })
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }