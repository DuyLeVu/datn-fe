import { CommentForm } from 'src/app/models/comment';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileDatabaseService {
  dataChange = new BehaviorSubject<CommentForm[]>([]);

  get data(): CommentForm[] { return this.dataChange.value; }
  constructor() {
    this.initialize();
   }

   initialize() {
    // Parse the string to json object.
    // const dataObject = JSON.parse(TREE_DATA);

    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.
    // const data = this.buildFileTree(dataObject, 0);

    // Notify the change.
    // this.dataChange.next(data);
  }
}
