import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { UserToken } from 'src/app/models/user-token';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-noti',
  templateUrl: './admin-noti.component.html',
  styleUrls: ['./admin-noti.component.css']
})
export class AdminNotiComponent implements OnInit {

  
  // @ViewChild('ngxLoading', {static: false}) ngxLoadingComponent: NgxLoadingComponent;
  // @ViewChild('customLoadingTemplate', {static: false}) customLoadingTemplate: TemplateRef<any>;
  // public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  public loading1 = false;
  public loading2 = false;
  // public loadingTemplate: TemplateRef<any>;
  categories!: Category[];
  // imgs: any[] = [];
  // currentUser: UserToken;
  // fb;
  // selectedImages: any[] = [];
  // html: '';
  // createPostForm: FormGroup = new FormGroup({
  //   content: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
  // });

  constructor(private userService: UserService,
              private router: Router,
              private categoryService: CategoryService,
              private postService: PostService,

  ) {

  }

  ngOnInit() {
    this.getAllCategory();
  }


  getAllCategory() {
    // this.categoryService.getAll().subscribe(value => {
    //   this.categories = value;
    // })
  }


  setCategoryForFormData() {
    let category;
    // tslint:disable-next-line:prefer-for-of
    // for (let i = 0; i < this.categories.length; i++) {
    //   if (this.categories[i].id == this.createPostForm.get('category').value) {
    //     category = this.categories[i];
    //   }
    // }
    // return category
  }

  setNewPost() {
    // let post: Post = {
    //   content: this.createPostForm.get('content').value,
    // }
    // post.status = '2';
    // if (post.category == undefined) {
    //   post.category = this.categories[this.categories.length - 1];
    // }
    // return post;
  }


  savePost() {
    // this.loading1 = true;
    // let post: Post = this.setNewPost();
    // this.authenticationService.currentUser.subscribe(x => {
    //   this.currentUser = x;
    //   this.userService.getUserProfile(x.id).subscribe(value => {
    //     post.user = value;
    //     return this.postService.create(post).subscribe(data => {
    //       if (this.selectedImages.length !== 0) {
    //         for (let i = 0; i < this.selectedImages.length; i++) {
    //           let selectedImage = this.selectedImages[i];
    //           var n = Date.now();
    //           const filePath = `RoomsImages/${n}`;
    //           const fileRef = this.storage.ref(filePath);
    //           this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
    //             finalize(() => {
    //               fileRef.getDownloadURL().subscribe(url => {
    //                 const image = {
    //                   linkImg: url,
    //                   postId: data.id
    //                 };
    //                 console.log(url);
    //                 this.imageService.create(image).subscribe(() => {
    //                   console.log('SUCCESSFULLY CREATE')
    //                 });
    //               });
    //             })
    //           ).subscribe();
    //         }
    //       }
    //       setTimeout(() => {
    //         this.loading1 = false;
    //         this.loading2 = true;
    //       }, 3500);
    //       setTimeout(() => {
    //         this.router.navigate(['/admin/posts']);
    //       }, 4500)
    //     });
    //   })
    // });
  }

}
