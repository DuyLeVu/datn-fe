import { AuthenticationService } from './../../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName = "";
  currentUser: any;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)])
  })
  // @ts-ignore
  homeUrl: string;
  // @ts-ignore
  returnUrl: string;
  // @ts-ignore
  adminUrl: string;

  loading = false;
  submitted = false;;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem("currentUser");
    this.homeUrl = "/users";
    this.returnUrl = '/users';
    this.adminUrl = '/admin';
  }

  login() {
    // console.log(this.loginForm.value);
    this.submitted = true;
    this.loading = true;
    this.authenticationService.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          // console.log(data);
          localStorage.setItem('currentUser', JSON.stringify(data));
          localStorage.setItem('ACCESS_TOKEN', data.accessToken);
          // localStorage.setItem('ROLE', data.roles[0].authority);
          localStorage.setItem('USERNAME', data.username);
          localStorage.setItem('USERID', data.id + "");
          if (data.roles[0].authority == "ROLE_ADMIN") {
            this.router.navigate([this.adminUrl]);
          } else {
            this.userService.getUserProfile(data.id + "").subscribe(result => {
              this.currentUser = result;
              localStorage.setItem('currentUser', JSON.stringify(result));
              this.userName = data.username;
              $('#exampleModal').modal('show')
              setTimeout(() => {
                $('#exampleModal').modal('hide');
                // this.showPopupForm = false;
                this.router.navigate([this.returnUrl]);
                // window.location.reload();
              }, 2000)
            },
              error => {
                console.log(error);
              })
          }
        },
        () => {
          $('#error').modal('show')
          // alert("Tài khoản của bạn đã bị khoá hoặc sai mật khẩu!");
          this.loading = false;
          setTimeout(() => {
            $('#error').modal('hide');
            // this.showPopupForm = false;
            localStorage.clear();
            this.loginForm.reset();
            this.router.navigate(['/login'])
          }, 2000);
        });
  }
}
