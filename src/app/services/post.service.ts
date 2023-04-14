import { ParamMap } from '@angular/router';
import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post";
import { PaginationService } from './pagination.service';
import { CommentForm } from '../models/comment';

const API_URL = environment.apiUrl + '/posts'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient,
    private paginationService: PaginationService
  ) { }

  getAll() {
    const mergedUrl =
      API_URL +
      `?page=${this.paginationService.page}&size=${
        this.paginationService.pageCount
      }`;

    return this.http.get<Post[]>(mergedUrl, { observe: 'response' });
  }

  getAllV2(page: number, size: number) {
    // const mergedUrl =
    //   API_URL +
    //   '?page=' + page `&size=` + size`;

    return this.http.get<Post[]>(API_URL + '?page=' + page + '&size=' + size);
  }

  getListQuestion(page: number, size: number) {
    // const mergedUrl =
    //   API_URL +
    //   '?page=' + page `&size=` + size`;

    return this.http.get<Post[]>(API_URL + '/question?page=' + page + '&size=' + size);
  }

  getAllForAdmin(page: number, size: number) {
    // const mergedUrl =
    //   API_URL +
    //   '?page=' + page `&size=` + size`;

    return this.http.get<Post[]>(API_URL + '/admin?page=' + page + '&size=' + size);
  }

  getAllPostByIndex(index: number): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL+ '/index/?index='+ index);
  }

  getAllNotPagination(status: number): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL+ `/public/${status}`);
  }

  getAllPostByCategoryAndIndex(index: number, id?: string): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL + `/categories/${id}` + '/index/?index=' + index);
  }

  getAllByCategory(id?: string) {
    const mergedUrl =
    API_URL + `/categories/${id}` +
    `?page=${this.paginationService.page}&size=${
      this.paginationService.pageCount
    }`;
    return this.http.get<Post[]>(mergedUrl, {observe: 'response'});
  }

  getTop6NewByCategory(id?: string): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL + `/findTop6By/categories/${id}`);
  }

  findTop6New(): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL + '/findTopNew');
  }

  findById(id?: string): Observable<Post> {
    return this.http.get<Post>(API_URL + `/${id}`);
  }

  create(post: Post): Observable<any> {
    return this.http.post<any>(API_URL, post);
  }

  getTop4PostByAdmin(): Observable<Post[]> {
    return this.http.get<Post[]>(API_URL+ '/byAdmin');
  }

  updatePost(id?: any, post?: any): Observable<any> {
    return this.http.put(API_URL + `/edit/${id}`, post);
  }

  deletePost(id?: any): Observable<any> {
    return this.http.delete(API_URL + `/del/${id}`);
  }

  addComment(id?: any, idParent?: any, comment?: CommentForm): Observable<Post> {
    let params = new HttpParams()
                .set('idParent', idParent);
    return this.http.post<any>(API_URL + `/${id}/comments`, comment, {params});
  }

  getListPostByCategoryId(categoryId: any, page: number, size: number) {
    return this.http.get<Post[]>(API_URL + `/category/${categoryId}` + '?page=' + page + '&size=' + size);
  }
}
