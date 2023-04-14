import { OverviewUserPostComponent } from './components/user/user-post/overview-user-post/overview-user-post.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListPostComponent } from './components/pages/post/list-post/list-post.component';
import { DetailPostComponent } from './components/pages/post/detail-post/detail-post.component';
import { ListPostByCategoryComponent } from './components/pages/post/list-post-by-category/list-post-by-category.component';
import { NewPostComponent } from './components/pages/post/new-post/new-post.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoriesComponent } from './components/pages/category/categories/categories.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverviewComponent } from './components/pages/post/overview/overview.component';
import { OverviewCategoryComponent } from './components/pages/category/overview-category/overview-category.component';
import { CategoryDetailComponent } from './components/pages/category/category-detail/category-detail.component';
import { NgxEditorModule } from 'ngx-editor';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { UserInfoComponent } from './components/user/user-info/user-info.component';
import { UserPostComponent } from './components/user/user-post/user-post/user-post.component';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import { environment } from 'src/environments/environment';
import { OverviewUserQuestionComponent } from './components/user/user-question/overview-user-question/overview-user-question.component';
import { UserQuestionComponent } from './components/user/user-question/user-question/user-question.component';
import { EditPostComponent } from './components/pages/post/edit-post/edit-post.component';
import { TreeModule } from '@circlon/angular-tree-component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminComponent } from './components/admin/admin/admin.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { AdminPostsComponent } from './components/admin/admin-posts/admin-posts.component';
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminNotiComponent } from './components/admin/admin-noti/admin-noti.component';
import { ListQuestionComponent } from './components/pages/question/list-question/list-question.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListPostComponent,
    DetailPostComponent,
    ListPostByCategoryComponent,
    NewPostComponent,
    HomeComponent,
    FooterComponent,
    CategoriesComponent,
    OverviewComponent,
    OverviewCategoryComponent,
    CategoryDetailComponent,
    UserInfoComponent,
    OverviewUserPostComponent,
    UserPostComponent,
    OverviewUserQuestionComponent,
    UserQuestionComponent,
    EditPostComponent,
    AdminComponent,
    SidebarComponent,
    AdminPostsComponent,
    AdminCategoriesComponent,
    AdminUsersComponent,
    AdminNotiComponent,
    ListQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatTreeModule,
    MatIconModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    // Registering EJ2 Rich Text Editor Module
    RichTextEditorModule,
    NgxEditorModule.forRoot({
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
