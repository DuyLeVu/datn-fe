import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.component.html',
  styleUrls: ['./list-question.component.css']
})
export class ListQuestionComponent implements OnInit {
  listPost!: Post[];
  p: number = 1;
  total: number = 0;
  size: number = 10;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.postService.getListQuestion(this.p, this.size).subscribe((result: any) => {
      this.listPost = result.content;
      this.total = result.totalElements;
      // console.log(result.content);
      // console.log(result.totalElements);
    })
  }

  pageChangeEvent(event: number) {
    this.p = event;
    this.getAllQuestions();
  }

}
