import { Post } from 'src/app/models/post';
import { PaginationService } from 'src/app/services/pagination.service';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from 'rxjs';


const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private paginationService: PaginationService) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/register', user);
  }

  registerSuccess(token: string): Observable<any> {
    return this.http.get<any>(API_URL + '/confirm-account?token=' + token);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/login', user);
  }

  // passwordForgot(forgotPassword: ForgotPassword): Observable<ForgotPassword> {
  //   return this.http.post<ForgotPassword>(API_URL + '/forgot-password', forgotPassword);
  // }

  newPassword(user: User, id: number): Observable<User> {
    return this.http.put<User>(API_URL + `/new-password/${id}`, user);
  }

  getUserProfile(id: string | undefined): Observable<User> {
    return this.http.get<User>(API_URL + `/users/${id}`);
  }

  getUserPosts(id?: any) {
    // return this.http.get<any>(API_URL + '/users/' + id + '/posts');
    const mergedUrl =
      API_URL +
      `/users/${id}` + `/posts/?page=${this.paginationService.page}&size=${this.paginationService.pageCount
      }`;
    return this.http.get<Post[]>(mergedUrl, { observe: 'response' });
  }

  updateUserProfile(user: User, id?: number): Observable<User> {
    return this.http.put<User>(API_URL + `/users/${id}`, user);
  }

  matchPassword(user:User) :Observable<User> {
    return this.http.post<User>(API_URL + '/match-password', user);
  }

  updateUserPassword(user: User, id?: number): Observable<User> {
    return this.http.put<User>(API_URL + `/users/update-info/${id}`, user);
  }

  getAll(page: number, size: number) {
    return this.http.get<User[]>(API_URL + '/admin?page=' + page + '&size=' + size);
  }
}
