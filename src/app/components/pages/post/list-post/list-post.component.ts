import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PaginationService } from 'src/app/services/pagination.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
  listPost!: Post[];
  listPostByAdmin: any = [];
  listPostByUser: any = [];
  // Paging
  dataSource!: Post[];
  // new MatTableDataSource<Customer>();
  displayedColumns = ['id', 'name', 'created', 'actions'];

  @Input('dataSource')
  set dataSourceForTable(value: Post[]) {
    this.dataSource = value;
  }
  // set dataSourceForTable(value: Post[]) {
  //     this.dataSource = new MatTableDataSource<Customer>(value);

  @Input() totalCount!: number;
  @Output() onDeleteCustomer = new EventEmitter();
  @Output() onPageSwitch = new EventEmitter();

  p: number = 1;
  total: number = 0;
  size: number = 10
  idNoti: number | undefined;

  constructor(private router: Router,
    private postService: PostService,
    public paginationService: PaginationService) { }

  ngOnInit(): void {
    this.postService.getTop4PostByAdmin().subscribe(result => {
      this.listPostByAdmin = result;
      this.idNoti = result[0].category?.id;
    }, error => {
      console.log(error);
    })

    this.getAllPosts();
    // this.postService.getAllPostByIndex(0).subscribe(result => {
    //   // console.log(result);
    //   this.listPost = result;
    //   console.log(this.listPost);
    //   result.forEach(element => {
    //     if (element.user?.roles?.[0]?.name == "ROLE_ADMIN") {
    //       this.listPostByAdmin.push(element);
    //     }
    //     else {
    //       this.listPostByUser.push(element);
    //     }
    //   });
    // }, error => {
    //   console.log(error);
    // });
    // this.postService.getAllNotPagination(1).subscribe(result => {
    //   this.listPostNotPagination = result;
    //   if ((this.listPostNotPagination.length % 5) != 0) {
    //     if ((this.listPostNotPagination.length / 5) < 1.5) { this.totalPagination = Math.round(this.listPostNotPagination.length / 5) + 1 }
    //     else this.totalPagination = Math.round((this.listPostNotPagination.length / 5));
    //   }
    // }, error => {
    //   console.log(error);
    // })
    // Get list newest post 
    // this.postService.findTop6New().subscribe(result => {
    //   this.listTopPostNew = result;
    // }, error => {
    //   console.log(error);
    // })
    // Get list category
    // this.categoryService.getAll().subscribe(result => {
    //   this.categories = result;
    // }, error => {
    //   console.log(error);
    // })
  }

  getAllPosts() {
    this.postService.getAllV2(this.p, this.size).subscribe((result: any) => {
      this.listPost = result.content;
      this.total = result.totalElements;
      // console.log(result.content);
      // console.log(result.totalElements);
    })
  }

  pageChangeEvent(event: number) {
    this.p = event;
    this.getAllPosts();
  }

  goToAdminNoti() {
    this.router.navigate(['users/category', this.idNoti,'posts']);
    }
    
}
