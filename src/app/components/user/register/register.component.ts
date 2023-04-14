import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error!: string;
  registerForm: UntypedFormGroup = new UntypedFormGroup({
    newUserName: new UntypedFormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    newPassWord: new UntypedFormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    newConfirmPassWord: new UntypedFormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    newEmail: new UntypedFormControl('', [Validators.required, Validators.email]),
  })

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm.reset();
  }

  register() {
    let newUser = {
      username: this.registerForm.value.newUserName,
      password: this.registerForm.value.newPassWord,
      confirmPassword: this.registerForm.value.newConfirmPassWord,
      email: this.registerForm.value.newEmail,
    }
    console.log(newUser)
    this.userService.register(newUser).subscribe(
      success => {
        $('#registerSuccess').modal('show')
        setTimeout(() => {
          $('#registerSuccess').modal('hide');
          this.registerForm.reset();
          this.router.navigate(['/login']);
        }, 2000)
        // this.registerForm.reset()
        // this.router.navigate(['/login']);
      }, error1 => {
        if (error1 instanceof HttpErrorResponse) {
          // console.log(error1.error);
          this.error = error1.error;
            $('#registerError').modal('show')
            setTimeout(() => {
            // setTimeout(() => {
              $('#registerError').modal('hide');
            //   // $("#showLogin").click()
            //   window.location.reload();
            }, 2000)
          }
        }
    )
  }

  reloadRegisterForm() {
    // window.location.reload();
    this.registerForm.reset();
  }

}
