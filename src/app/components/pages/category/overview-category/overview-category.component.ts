import { CategoryService } from 'src/app/services/category.service';
import { Category } from './../../../../models/category';
import { Component, Input, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-overview-category',
  templateUrl: './overview-category.component.html',
  styleUrls: ['./overview-category.component.css']
})
export class OverviewCategoryComponent implements OnInit {

  dataSource!: Category[];
  totalCount!: number;
  categoryId?: string | null;

  // @Input('categoryId')
  //   set dataCategoryId(value: string | null)
  //   {
  //     this.categoryId = value;
  //   }

  constructor(private categoryService: CategoryService,
    private paginationService: PaginationService,
  ) { }

  ngOnInit(): void {
    // if (this.categoryId == null) {
    //   this.getAllPosts();
    // } else {
    //   // Get list post by categoryId 
    //   this.getAllPostsByCategory(this.categoryId);
    // }
    this.getAllCategories();
  }

  switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.getAllCategories();
    // if (this.categoryId == null) {
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

  getAllCategories() {
    this.categoryService.getAll().subscribe((result: any) => {
      this.totalCount = result.body.totalElements;
      this.dataSource = result.body.content;
    })
  }
}
