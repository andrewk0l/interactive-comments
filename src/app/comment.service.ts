import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentModel } from '../app/comment/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private jsonUrl = 'assets/data/comments.json';

  constructor(private http: HttpClient) {}

  getComments(): Observable<{ comments: CommentModel[] }> {
    return this.http.get<{ comments: CommentModel[] }>(this.jsonUrl);
  }
}
