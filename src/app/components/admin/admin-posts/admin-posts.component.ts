import { PostService } from 'src/app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements OnInit {
  listPost!: Post[];
  p: number = 1;
  total: number = 0;
  size: number = 10;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postService.getAllForAdmin(this.p, this.size).subscribe((res: any) => {
      this.listPost = res.content;
      this.total = res.totalElements;
    })
  }

  pageChangeEvent(event: number) {
    this.p = event;
    this.getAllPosts();
  }

  deletePost(id: string | undefined) {
    if (confirm("Bạn có chắc chắn muốn xoá bài viết này?")) {
      this.postService.deletePost(id).subscribe(()=> {
        alert("Xoá thành công!");
        this.getAllPosts();
      })
    }
  }
}
