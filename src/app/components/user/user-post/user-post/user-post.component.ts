import { getLocaleCurrencyCode } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit {
  userId?: string | null;
  // Paging
  dataSource!: Post[];

  @Input('dataSource')
  set dataSourceForTable(value: Post[]) {
    this.dataSource = value;
  }

  @Input('userId')
  set userIdForData(value: string | undefined | null) {
    this.userId = value;
  }

  @Input() totalCount!: number;
  // @Output() onDeleteCustomer = new EventEmitter();
  @Output() onPageSwitch = new EventEmitter();
  
  constructor(public paginationService: PaginationService) { }

  ngOnInit(): void {
  
  }
}
