import { AdminCategoriesComponent } from './../../components/admin/admin-categories/admin-categories.component';
import { AdminPostsComponent } from './../../components/admin/admin-posts/admin-posts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminUsersComponent } from 'src/app/components/admin/admin-users/admin-users.component';
import { AdminNotiComponent } from 'src/app/components/admin/admin-noti/admin-noti.component';

const routes: Routes = [
  {
    path: 'posts',
    component: AdminPostsComponent
  }, {
    path: '',
    component: AdminPostsComponent
  }, {
    path: 'categories',
    component: AdminCategoriesComponent
  }, {
    path: 'users',
    component: AdminUsersComponent
  }, {
    path: 'new-noti',
    component: AdminNotiComponent
  },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AdminModule { }
