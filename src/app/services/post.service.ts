import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../Models/user.model';
import {  Headers, Http, Response } from '@angular/http';
import { Observable , throwError} from 'rxjs';
import { HttpClient, HttpHeaders , HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {map, catchError } from 'rxjs/operators';
import { Post } from '../../Models/post.model';
import { Title } from '@angular/platform-browser';
@Injectable()
export class PostService {

    constructor(private http: HttpClient ) {}


    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      }

      postImage(np: Post) {
          const postData = new FormData();

          postData.append('hashtag' , np.hashtag);
          postData.append('type' , np.type);
          postData.append('content', np.content);
          postData.append('image' , np.image , np.title);
          postData.append('title' , np.title);
          postData.append('by' , np.by);


          return this.http.post('http://localhost:3000/api/post/pimage', postData)
          .pipe(catchError(this.handleError));
      }

      postText(np: Post) {
        console.log(np);
        const body = JSON.stringify(np);
        const httpOptions = {
           headers: new HttpHeaders({
             'Content-Type':  'application/json'
           })
         };
        return this.http.post('http://localhost:3000/api/post/ptext', body, httpOptions)
        .pipe(catchError(this.handleError));
      }

      getPosts() {
        return this.http.get('http://localhost:3000/api/post/getAllPosts')
        .pipe(catchError(this.handleError));
      }
}
