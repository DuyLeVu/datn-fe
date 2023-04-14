import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  listUser!: User[];
  p: number = 1;
  total: number = 0;
  size: number = 10;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAll(this.p, this.size).subscribe((res: any) => {
      this.listUser = res.content;
      this.total = res.totalElements;
      console.log(res);
    })
  }

  pageChangeEvent(event: number) {
    this.p = event;
    this.getAllUsers();
  }

}
