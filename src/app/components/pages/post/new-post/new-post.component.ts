import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { UserToken } from 'src/app/models/user-token';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { Category } from 'src/app/models/category';
import { HttpErrorResponse } from '@angular/common/http';
import { NoWhitespaceValidator } from 'src/app/validators/no-whitespace.validator';
declare var $: any;
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})

export class NewPostComponent implements OnInit {
  public loading2 = false;
  error!: string;
  createPostForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, NoWhitespaceValidator()]),
    content: new FormControl('', [Validators.required, NoWhitespaceValidator()]),
    editorContent: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    // optional: new FormControl('',),
  });

  currentUser!: UserToken;
  categories!: Category[];
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  public customToolbar: Object = {
    items: ['Bold', 'Italic', 'Undo', 'Redo']
  };

  constructor(private authenticationService: AuthenticationService,
    private userService: UserService,
    private postService: PostService,
    private router: Router,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  };

  getAllCategory() {
    this.categoryService.getAllNoPaging().subscribe(value => {
      this.categories = value;
    })
  }

  savePost() {
    // this.loading1 = true;
    let post: Post = this.setNewPost();
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userService.getUserProfile(x.id).subscribe(value => {
        post.user = value;
        return this.postService.create(post).subscribe(data => {
          console.log(post);
          $('#addNewPostSuccess').modal('show')
          // this.loading2 = false;
          setTimeout(() => {
            $('#addNewPostSuccess').modal('hide');
          }, 2000)
          setTimeout(() => {
            this.router.navigate(['users/post', data.id]);
          }, 4000)
        }, error1 => {
          if (error1 instanceof HttpErrorResponse) {
            console.log(error1);
            if (error1.status == 400) {
              this.error = error1.error;
              $('#createPost-Error').modal('show')
              setTimeout(() => {
                // this.createPostForm.reset();
                $('#createPost-Error').modal('hide');
              }, 2000)
            }
          }
        });
      })
    });
  }

  setCategoryForFormData() {
    let category;
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id == this.createPostForm.value.category) {
        category = this.categories[i];
      }
    }
    return category
  }

  setNewPost() {
    let post: Post = {
      title: this.createPostForm.value.title,
      content: this.createPostForm.value.content,
      detail: this.createPostForm.value.editorContent,
      category: this.setCategoryForFormData(),
      description: this.createPostForm.value.description,
      // imgs: this.fb
    }
    post.status = '1';
    if (post.category == undefined) {
      // post.category = this.categories[this.categories.length - 1];
    }
    console.log(post)
    return post;
  }

  // openSelect(event: any) {
  //   if (event.target.value === 'Trong trường') {
  //     // $('#truong').style.display = '';
  //     this.loading2 = true;
  //   } else {
  //     // $('#truong').style.display = 'none';
  //     this.loading2 = false;
  //   }
  // }

}
