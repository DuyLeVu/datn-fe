import { CategoryService } from 'src/app/services/category.service';
import { Category } from './../../../../models/category';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  error!: any;
  listCategory: any;
  listCountPostByCategory: number[] = [];
  p: number = 1;
  total: number = 0;
  size: number = 6;


  // Paging
  dataSource!: Category[];
  // new MatTableDataSource<Customer>();
  displayedColumns = ['id', 'name', 'created', 'actions'];

  @Input('dataSource')
  set dataSourceForTable(value: Category[]) {
    this.dataSource = value;
  }

  @Input() totalCount!: number;
  // @Output() onDeleteCustomer = new EventEmitter();
  @Output() onPageSwitch = new EventEmitter();


  constructor(private router: Router,
    public paginationService: PaginationService,
    public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getAllV2(this.p, this.size).subscribe((result: any) => {
      this.total = result.totalElements;
      this.listCategory = result.content;
      // Count posts by category id
      // this.listCountPostByCategory = [];
      // for (let i = 0; i < this.listCategory.length; i++) {
      //   // Call API count post by categoryId
      //   this.categoryService.countPostByCategoryId(this.listCategory[i].id).subscribe(countPost => {
      //     this.listCountPostByCategory.push(countPost);
      //   }, error1 => {
      //     this.error = "Lỗi hệ thống, vui lòng chờ!";
      //     $('#countPostError').modal('show')
      //     setTimeout(() => {
      //       $('#countPostError').modal('hide');
      //       this.router.navigate(['users']);
      //     }, 2000);
      //   });
      // };
    })
  }

  pageChangeEvent(event: number) {
    this.p = event;
    this.getAllCategories();
  }

  countPostByCategoryId() {

    // console.log(this.listCountPostByCategory);

  }

}
