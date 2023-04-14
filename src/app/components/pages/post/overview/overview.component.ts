import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PaginationService } from 'src/app/services/pagination.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  dataSource!: Post[];
  totalCount!: number;
  categoryId?: string | null;

  @Input('categoryId')
    set dataCategoryId(value: string | null)
    {
      this.categoryId = value;
    }

  constructor(private postService: PostService,
    private paginationService: PaginationService,
    ) { }

  ngOnInit(): void {
    this.getAllPosts();
  //   if (this.categoryId == null){
  //   this.getAllPosts();
  // } else {
  //   // Get list post by categoryId 
  //   this.getAllPostsByCategory(this.categoryId);
  // }
  }

  switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.getAllPosts();
    // if (this.categoryId == null){
    //   this.getAllPosts();
    // } else {
    //   // Get list post by categoryId 
    //   this.getAllPostsByCategory(this.categoryId);
    // }
  }

  // delete(customer: Customer) {
  //     this.customerDataService.fireRequest(customer, 'DELETE')
  //         .subscribe(() => {
  //             this.dataSource = this.dataSource.filter(x => x.id !== customer.id);
  //         });
  // }

  getAllPosts() {
    // this.customerDataService.getAll<Customer[]>()
    //     .subscribe((result: any) => {
    //         this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
    //         this.dataSource = result.body.value;
    //     });
    this.postService.getAll().subscribe((result: any)  => {
      // this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
      // console.log(result.body.content);
      this.totalCount = result.body.totalElements;
      this.dataSource = result.body.content;
  })
}

  getAllPostsByCategory(id?: string) {
    // this.customerDataService.getAll<Customer[]>()
    //     .subscribe((result: any) => {
    //         this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
    //         this.dataSource = result.body.value;
    //     });
    this.postService.getAllByCategory(id).subscribe((result: any)  => {
      // this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
      // console.log(result.body.content);
      this.totalCount = result.body.totalElements;
      this.dataSource = result.body.content;
  })
}
}
