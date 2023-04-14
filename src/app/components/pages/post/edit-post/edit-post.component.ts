import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostService } from 'src/app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NoWhitespaceValidator } from 'src/app/validators/no-whitespace.validator';
import { UserToken } from 'src/app/models/user-token';
import { Category } from 'src/app/models/category';
import { Editor, Toolbar } from 'ngx-editor';
import { CategoryService } from 'src/app/services/category.service';
import { Post } from 'src/app/models/post';
import { HttpErrorResponse } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  public loading2 = false;
  error!: string;
  actionName!: string;
  post!: Post;
  updatePostForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, NoWhitespaceValidator()]),
    content: new FormControl('', [Validators.required, NoWhitespaceValidator()]),
    editorContent: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    optional: new FormControl('',),
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

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private categoryService: CategoryService,
    private authenticationService: AuthenticationService,
    private userService: UserService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.getPost();
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

  getPost() {
    this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.postService.findById(id + "").subscribe(value => {
        this.post = value;
        this.updatePostForm = new FormGroup({
          title: new FormControl(this.post.title, [Validators.required, NoWhitespaceValidator()]),
          content: new FormControl(this.post.content, [Validators.required, NoWhitespaceValidator()]),
          editorContent: new FormControl(this.post.detail, [Validators.required]),
          category: new FormControl('', [Validators.required]),
          description: new FormControl('', [Validators.required]),
          optional: new FormControl('',),
        })
      }, error => {
        console.log(error);
      });
    });
  }

  updatePost() {
    // this.loading1 = true;
    let newPost: Post = this.setNewPost();
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userService.getUserProfile(x.id).subscribe(value => {
        newPost.user = value;
        return this.postService.updatePost(this.post.id, newPost).subscribe(data => {
          //           console.log(post);
          $('#updatePostSuccess').modal('show')
          this.loading2 = false;
          setTimeout(() => {
            $('#updatePostSuccess').modal('hide');
            this.router.navigated = false;
            this.router.navigate(['users/post', this.post.id]);
          }, 2000)
          //           setTimeout(() => {
          //             this.router.navigate(['users/post', data.id]);
          //           }, 4000)
        }, error1 => {
          if (error1 instanceof HttpErrorResponse) {
            console.log(error1);
            if (error1.status == 400) {
              this.error = error1.error;
              $('#updatePostError').modal('show')
              setTimeout(() => {
                // this.createPostForm.reset();
                $('#updatePostError').modal('hide');
                this.router.navigate(['users/post', this.post.id]);
              }, 2000)
            }
            else {
              this.error = "Lỗi hệ thống, Vui lòng thử lại!";
              $('#updatePostError').modal('show')
              setTimeout(() => {
                // this.createPostForm.reset();
                $('#updatePostError').modal('hide');
                this.router.navigate(['users/post', this.post.id]);
              }, 2000);
            }
          }
        });
      })
    });
    this.updatePostForm.reset();
  }

  setNewPost() {
    let post: Post = {
      title: this.updatePostForm.value.title,
      content: this.updatePostForm.value.content,
      detail: this.updatePostForm.value.editorContent,
      category: this.setCategoryForFormData(),
      description: this.updatePostForm.value.description + ' ' + this.updatePostForm.value.optional,
    }
    post.status = '1';
    if (post.category == undefined) {
      // post.category = this.categories[this.categories.length - 1];
    }
    console.log(post)
    return post;
  }

  setCategoryForFormData() {
    let category;
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].id == this.updatePostForm.value.category) {
        category = this.categories[i];
      }
    }
    return category
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
