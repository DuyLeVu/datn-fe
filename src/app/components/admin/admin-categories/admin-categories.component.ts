import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  listCategory!: Category[];
  p: number = 1;
  total: number = 0;
  size: number = 10;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.categoryService.getAllV2(this.p, this.size).subscribe((res: any) => {
      this.listCategory = res.content;
      this.total = res.totalElements;
      console.log(res);
      
    })
  }

  pageChangeEvent(event: number) {
    this.p = event;
    this.getAllCategories();
  }

  deleteCategory(id: string) {
    // if (confirm("Bạn có chắc chắn muốn xoá danh mục này?")) {
    //   this.categoryService.deleteCategory(id).subscribe(()=> {
    //     alert("Xoá thành công!");
    //     this.getAllPosts();
    //   })
    // }
  }
}
