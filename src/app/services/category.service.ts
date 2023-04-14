import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { PaginationService } from './pagination.service';

const API_URL = environment.apiUrl + '/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient,
    private paginationService: PaginationService) { }

  getAll() {
    const mergedUrl =
      API_URL +
      `?page=${this.paginationService.page}&size=${this.paginationService.pageCount
      }`;
    return this.http.get<Category[]>(mergedUrl, { observe: 'response' });
  }

  getAllV2(page: number, size: number) {
    return this.http.get<Category[]>(API_URL + '?page=' + page + '&size=' + size);
  }
  getAllNoPaging(): Observable<Category[]> {
    return this.http.get<Category[]>(API_URL + `/categories`);
  }
  findById(id?: string): Observable<Category> {
    return this.http.get<Category>(API_URL + `/${id}`);
  }

  countPostByCategoryId(id?: string): Observable<number> {
    return this.http.get<number>(API_URL + `/countPostByCategory/${id}`)
  }

  getAllForAdmin(page: number, size: number) {
    return this.http.get<Category[]>(API_URL + '/admin?page=' + page + '&size=' + size);
  }
} 
