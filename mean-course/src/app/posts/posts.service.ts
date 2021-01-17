import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from 'src/environments/environment';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private http: HttpClient){}

  getPosts() {
    return this.http.get<{message: string, posts: Post[]}>(`${environment.apiPath}/posts`).pipe(
      map(res => res.posts)
    )
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {title: title, content: content};
    return this.http.post(`${environment.apiPath}/posts`, post).subscribe((res) => {
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    })
  }
}
