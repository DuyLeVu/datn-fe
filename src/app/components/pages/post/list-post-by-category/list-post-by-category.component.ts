import { PostService } from 'src/app/services/post.service';
import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { HttpErrorResponse } from '@angular/common/http';

declare var $: any;
@Component({
  selector: 'app-list-post-by-category',
  templateUrl: './list-post-by-category.component.html',
  styleUrls: ['./list-post-by-category.component.css']
})
export class ListPostByCategoryComponent implements OnInit {
  error!: any;
  countPost!: number;
  categoryId!: number;
  id!: string;
  category!: Category;
  p: number = 1;
  total: number = 0;
  size: number = 10;
  listPost!: Post[];

  constructor(private categoryService: CategoryService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private postService: PostService) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      // @ts-ignore
      this.id = id;
    }, (error: any) => {
      this.error = "Lỗi hệ thống, vui lòng chờ!";
      $('#error').modal('show')
      setTimeout(() => {
        $('#error').modal('hide');
        this.router.navigate(['users']);
      }, 2000);
    });

    this.countPostByCategoryId(this.id);
    this.getCategoryById(this.id);
    this.getListPostByCategoryId();
  }

  getCategoryById(id: string) {
    if (id === undefined) { return };
    this.categoryService.findById(id).subscribe((result: any) => {
      this.category = result
    }, (error: any) => {
      this.error = "Lỗi hệ thống, vui lòng chờ!";
      $('#error').modal('show')
      setTimeout(() => {
        $('#error').modal('hide');
        this.router.navigate(['users']);
      }, 2000);
    })
  }

  countPostByCategoryId(id: string) {
    if (id === undefined) { return };
    this.categoryService.countPostByCategoryId(id).subscribe(result => {
      this.countPost = result;
    }, error1 => {
      this.error = "Lỗi hệ thống, vui lòng chờ!";
      $('#error').modal('show')
      setTimeout(() => {
        $('#error').modal('hide');
        this.router.navigate(['users']);
      }, 2000);
    });
  }

  getListPostByCategoryId() {
    this.postService.getListPostByCategoryId(this.id, this.p, this.size).subscribe((result: any) => {
      // console.log(result);
      this.listPost = result.content;
      this.total = result.totalElements;
    }, error1 => {
      if (error1 instanceof HttpErrorResponse) {
        if (error1.status == 400) {
          this.error = error1.error;
          $('#error').modal('show')
          setTimeout(() => {
            $('#error').modal('hide');
            this.router.navigate(['users']);
          }, 2000)
        }
        else {
          this.error = "Lỗi hệ thống, Vui lòng thử lại!";
          $('#error').modal('show')
          setTimeout(() => {
            $('#error').modal('hide');
            this.router.navigate(['users']);
          }, 2000);
        }
      }
    });
  }

  pageChangeEvent(event: number) {
    this.p = event;
    this.getListPostByCategoryId();
  }
}
