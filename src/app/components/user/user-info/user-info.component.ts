import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserToken } from 'src/app/models/user-token';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
declare var $: any;

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  currentUser?: UserToken;
  curentUserFromLocalStorage: User = {}
  user: User = {};
  updateForm!: FormGroup;
  error!: string;
  fb: string | undefined;
  downloadURL: Observable<string> | undefined;
  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private storage: AngularFireStorage) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit(): void {
    this.user = {

    }

    // this.curentUserFromLocalStorage = {

    // }
    this.prepareForm();
    this.getUser();
    this.getCurentUserFromLocalStorage();
  }

  prepareForm() {
    this.updateForm = new FormGroup({
      fullName: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
      // dateOfBirth: new FormControl('',[Validators.required]),
      gender: new FormControl('', [Validators.required]),
    })
  }

  getUser() {
    this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.userService.getUserProfile(id + "").subscribe(value => {
        this.user = value;
        console.log(this.user);
        this.updateForm = new FormGroup({
          fullName: new FormControl(this.user.fullName, [Validators.required]),
          email: new FormControl(this.user.email, [Validators.required, Validators.email]),
          phoneNumber: new FormControl(this.user.phoneNumber, [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
          // dateOfBirth: new FormControl(this.user.dateOfBirth),
          gender: new FormControl(this.user.gender, [Validators.required]),
        })
      }, error => {
        console.log(error);
      });
      // this.userService.getUserPosts(id).subscribe(res => {
      //   // this.posts = res;
      // })

      // this.userService.getUserLinkdocs(id).subscribe(res => {
      //   this.linkDocs = res;
      // })
    });
  }

  getCurentUserFromLocalStorage() {
    // this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
    // const id = paraMap.get('id');
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
      this.userService.getUserProfile(x.id + "").subscribe(value => {
        this.curentUserFromLocalStorage = value;
        // console.log(this.curentUserFromLocalStorage);
        this.updateForm = new FormGroup({
          fullName: new FormControl(this.curentUserFromLocalStorage.fullName, [Validators.required]),
          email: new FormControl(this.curentUserFromLocalStorage.email, [Validators.required, Validators.email]),
          phoneNumber: new FormControl(this.curentUserFromLocalStorage.phoneNumber, [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
          // dateOfBirth: new FormControl(this.user.dateOfBirth),
          gender: new FormControl(this.curentUserFromLocalStorage.gender, [Validators.required]),
        })
      }, error => {
        console.log(error);
      });
      // this.userService.getUserPosts(id).subscribe(res => {
      //   // this.posts = res;
      // })

      // this.userService.getUserLinkdocs(id).subscribe(res => {
      //   this.linkDocs = res;
      // })
    });
  }

  setInfo() {
    let newUser: User = {
      id: this.curentUserFromLocalStorage.id,
      username: this.curentUserFromLocalStorage.username,
      password: this.curentUserFromLocalStorage.password,
      confirmPassword: this.curentUserFromLocalStorage.confirmPassword,
      fullName: this.updateForm.value.fullName,
      email: this.updateForm.value.email,
      phoneNumber: this.updateForm.value.phoneNumber,
      gender: this.updateForm.value.gender,
      avatar: this.curentUserFromLocalStorage.avatar
      // imageUrls: this.user.imageUrls
    }
    return newUser;
  }

  updateProfileUser() {
    // $('#passwordChangeForm').modal('hide');
    let userNewInfo = this.setInfo();
    console.log(userNewInfo);
    this.userService.updateUserProfile(userNewInfo, this.user.id).subscribe(() => {
      $('#settingForm').modal('hide');

      $('#updateUserProfileSuccess').modal('show')
      // this.loading2 = false;
      setTimeout(() => {
        $('#updateUserProfileSuccess').modal('hide');
        this.router.navigated = false;
        this.router.navigate(['users/user', this.user.id]);
      }, 2000)
      // setTimeout(() => {
      //   this.router.navigate(['users/user', this.user.id]);
      // }, 3000)
    }, error1 => {
      $('#settingForm').modal('hide');
      if (error1 instanceof HttpErrorResponse) {
        console.log(error1);
        if (error1.status == 400) {
          this.error = error1.error;
          $('#updateUserProfileError').modal('show')
          setTimeout(() => {
            // this.createPostForm.reset();
            $('#updateUserProfileError').modal('hide');
            $('#settingForm').modal('show');
          }, 2000)
        }
      } else {
        this.error = "Lỗi hệ thống, Vui lòng thử lại!";
        $('#updateUserProfileError').modal('show')
        setTimeout(() => {
          $('#updateUserProfileError').modal('hide');
          $('#settingForm').modal('show');
        }, 2000);
      }
    });
    this.updateForm.reset();
  };

  openSettingForm() {
    this.prepareForm();
    this.getUser();
    $('#settingForm').modal('show')
  }

  onFileSelected(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.curentUserFromLocalStorage.avatar = url
            }
            console.log(this.user.avatar);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  resetForm() {
    // console.log("reset form")
    this.updateForm.reset();
  }
}
