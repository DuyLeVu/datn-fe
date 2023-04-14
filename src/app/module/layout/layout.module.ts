import { OverviewUserQuestionComponent } from './../../components/user/user-question/overview-user-question/overview-user-question.component';
import { OverviewUserPostComponent } from './../../components/user/user-post/overview-user-post/overview-user-post.component';
import { UserInfoComponent } from './../../components/user/user-info/user-info.component';
import { OverviewCategoryComponent } from './../../components/pages/category/overview-category/overview-category.component';
import { OverviewComponent } from '../../components/pages/post/overview/overview.component';
import { HomeComponent } from './../../components/home/home.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from "src/app/components/pages/category/categories/categories.component";
import { DetailPostComponent } from "src/app/components/pages/post/detail-post/detail-post.component";
import { ListPostByCategoryComponent } from "src/app/components/pages/post/list-post-by-category/list-post-by-category.component";
import { ListPostComponent } from "src/app/components/pages/post/list-post/list-post.component";
import { NewPostComponent } from "src/app/components/pages/post/new-post/new-post.component";
import { CategoryDetailComponent } from 'src/app/components/pages/category/category-detail/category-detail.component';
import { EditPostComponent } from 'src/app/components/pages/post/edit-post/edit-post.component';
import { ListQuestionComponent } from 'src/app/components/pages/question/list-question/list-question.component';


const routes: Routes = [
  {
    path: '',
    component: ListPostComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'category/:id',
    component: CategoryDetailComponent
  },
  {
    path: 'list-post/:id',
    component: ListPostByCategoryComponent
  },
  {
    path: 'post/:id',
    component: DetailPostComponent
  },
  {
    path: 'category',
    component: CategoriesComponent
  },
  {
    path: 'category/:id/posts',
    component: ListPostByCategoryComponent
  },
  {
    path: 'new-post',
    component: NewPostComponent
  },
  {
    path: 'user/:id',
    component: UserInfoComponent,
    loadChildren: () => import('../user/user.module').then(module => module.UserModule)
    // children: [{
    //   path: '',
    //   component: OverviewUserPostComponent,
    //   path: 'u-question',
    //   component: OverviewUserQuestionComponent
    // }]
  },
  {
    path: 'edit/:id',
    component: EditPostComponent
  },
  {
    path: 'questions',
    component: ListQuestionComponent
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class LayoutModule { }
