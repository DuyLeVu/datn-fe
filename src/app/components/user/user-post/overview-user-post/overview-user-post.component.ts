import { UserService } from 'src/app/services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-overview-user-post',
  templateUrl: './overview-user-post.component.html',
  styleUrls: ['./overview-user-post.component.css']
})
export class OverviewUserPostComponent implements OnInit {
  dataSource!: Post[];
  totalCount!: number;
  userId?: string | null;

  constructor(private activatedRoute: ActivatedRoute,
    private paginationService: PaginationService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.userId = id;
      // console.log(id);
    });
    this.getAllPostsByUserId();
  }

  switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.getAllPostsByUserId();
  }

  getAllPostsByUserId() {
    this.userService.getUserPosts(this.userId).subscribe((result: any) => {
      console.log(result.body.content);
      this.totalCount = result.body.totalElements;
      console.log(this.totalCount);
      this.dataSource = result.body.content;
  })
}
}
