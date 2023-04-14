import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from '../models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private paginationModel: Pagination;

  get page(): number {
      return this.paginationModel.pageIndex;
  }

  get selectItemsPerPage(): number[] {
      return this.paginationModel.selectItemsPerPage;
  }

  get pageCount(): number {
      return this.paginationModel.pageSize;
  }

  constructor() {
      this.paginationModel = new Pagination();
  }

  change(pageEvent: PageEvent) {
      this.paginationModel.pageIndex = pageEvent.pageIndex + 1;
      this.paginationModel.pageSize = pageEvent.pageSize;
      this.paginationModel.allItemsLength = pageEvent.length;
  }
}
