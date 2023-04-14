import { AdminComponent } from './components/admin/admin/admin.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    loadChildren: () => import('./module/layout/layout.module').then(module => module.LayoutModule)
  },
  {
    path: 'admin',
    component: AdminComponent,
    loadChildren: () => import('./module/admin/admin.module').then(module => module.AdminModule)
  },
  {
    path: 'users',
    component: HomeComponent,
    loadChildren: () => import('./module/layout/layout.module').then(module => module.LayoutModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
