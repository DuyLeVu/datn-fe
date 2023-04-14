import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  error!: string;
  currentUser: any;
  categories!: Category[];
  categoryId!: string | null;
  currentUserName: any;
  currentUserId: any;
  user!: User;
  passwordChangeForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
  })

  constructor(private router: Router,
    private categoryService: CategoryService,
    private activateRoute: ActivatedRoute,
    private userService: UserService) {
    if (localStorage.getItem('currentUser') == null) {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUserName = localStorage.getItem("USERNAME");
    this.currentUserId = localStorage.getItem("USERID");
    if (this.currentUser == null) {
      this.router.navigate(['/login']);
    }
    // Get list categories
    // this.categoryService.getAll().subscribe(data => {
    //   this.categories = data;
    // })
    // CategoryId
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      // console.log(id);
      this.categoryId = id;
    }, error => { console.error(error) });

    this.getUser();
  }

  logout() {
    localStorage.clear();
    // this.router.navigate(['']);
    $('#logout').modal('show')
    setTimeout(() => {
      $('#logout').modal('hide');
      // $("#showLogin").click()
      // window.location.reload();
      this.router.navigate(['']);
    }, 2000)
  }

  getUser() {
    // this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
    // const id = paraMap.get('id');
    this.userService.getUserProfile(this.currentUserId + "").subscribe(value => {
      this.currentUser = value;
    }, error => {
      console.log(error);
    });
  }

  showChangePasswordModal() {
    $('#passwordChangeForm').modal('show');
  }

  // isUserNameDuplicated(control: AbstractControl): Observable<ValidationErrors> {
  //   // return of(null);
  //   this.userService.matchPassword(user1).subscribe(result => {

  //   })
  // }

  // isPasswordNotCorrect(control: AbstractControl): Observable<ValidationErrors> {
  //   let user1 = {
  //     id: this.currentUserId,
  //     password: control.value
  //   }
  //   console.log(user1)
  //   const response = new Observable(resolve => {
  //     setTimeout(() => {
  //       let passwordNotCorrect = true;
  //       let isValid = false;
  //       this.userService.checkPassword(user1).subscribe(result => {
  //          passwordNotCorrect = false;
  //       }, error => {
  //          isValid = !passwordNotCorrect;
  //       });
  //       return isValid ? null as any : { isPasswordNotCorrect: "value is only whitespace" };
  //     },5000)
  //   })


  // }


  changePassword() {
    $('#passwordChangeForm').modal('hide');
    let user1 = {
      id: this.currentUserId,
      password: this.passwordChangeForm.value.password
    }
    // @ts-ignore
    this.userService.matchPassword(user1).subscribe(result => {
      if (this.passwordChangeForm.value.newPassword == this.passwordChangeForm.value.confirmNewPassword) {
        this.currentUser.password = this.passwordChangeForm.value.newPassword;
        this.currentUser.confirmPassword = this.passwordChangeForm.value.confirmNewPassword;
        this.userService.updateUserPassword(this.currentUser, this.currentUser.id).subscribe(result => {
          // console.log("sửa thành công")
          $('#changePasswordSuccess').modal('show')
      // this.loading2 = false;
      setTimeout(() => {
        $('#changePasswordSuccess').modal('hide');
        // this.router.navigated = false;
        this.router.navigate(['users']);
      }, 2000)
        }, error => {
          console.log("lol")
          this.handleHttpErrorResponse(error);
        });
      } else {
        console.log("wrong confirm password")
        this.error = "Xác nhận mật khẩu không chính xác!";
        $('#changePasswordError').modal('show')
        setTimeout(() => {
          $('#changePasswordError').modal('hide');
          $('#passwordChangeForm').modal('show');
        }, 2000);
      }
    }, (error1: any) => {
      this.handleHttpErrorResponse(error1);
      // if (error1 instanceof HttpErrorResponse) {
      //   if (error1.status == 400) {
      //     this.error = error1.error;
      //     $('#changePasswordError').modal('show')
      //     setTimeout(() => {
      //       // this.createPostForm.reset();
      //       $('#changePasswordError').modal('hide');
      //       $('#passwordChangeForm').modal('show');
      //     }, 2000)
      //   }
      //   else {
      //     this.error = "Lỗi hệ thống, Vui lòng thử lại!";
      //     $('#changePasswordError').modal('show')
      //     setTimeout(() => {
      //       $('#changePasswordError').modal('hide');
      //       $('#passwordChangeForm').modal('show');
      //     }, 2000);
      //   }
      // }
      // console.log("wrong old password");
    })
  }

  resetForm() {
    // console.log("reset form")
    this.passwordChangeForm.reset();
  }

  handleHttpErrorResponse(error: any){
    if (error instanceof HttpErrorResponse) {
      if (error.status == 400) {
        this.error = error.error;
        $('#changePasswordError').modal('show')
        setTimeout(() => {
          // this.createPostForm.reset();
          $('#changePasswordError').modal('hide');
          $('#passwordChangeForm').modal('show');
        }, 2000)
      }
      else {
        this.error = "Lỗi hệ thống, Vui lòng thử lại!";
        $('#changePasswordError').modal('show')
        setTimeout(() => {
          $('#changePasswordError').modal('hide');
          $('#passwordChangeForm').modal('show');
        }, 2000);
      }
    }
  }

}
