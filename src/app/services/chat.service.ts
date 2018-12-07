import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../Models/user.model';
import {  Headers, Http, Response } from '@angular/http';
import { Observable , throwError} from 'rxjs';
import { HttpClient, HttpHeaders , HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {map, catchError } from 'rxjs/operators';
import { ChatRoom } from '../../Models/chatroom.model';
import { Message } from '../../Models/message.model';
@Injectable()
export class ChatService {

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

      loadChatTags() {
        return this.http.get('http://localhost:3000/api/chat/getChatTags')
        .pipe(catchError(this.handleError));
      }

      createNewTag(room: ChatRoom) {
        const body = JSON.stringify(room);
     const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
     return this.http.post('http://localhost:3000/api/chat/newRoom', body, httpOptions)
     .pipe(catchError(this.handleError));
      }

      loadChatRoom(tag: String) {
        return this.http.get('http://localhost:3000/api/chat/getChatRoom/' + tag)
        .pipe(catchError(this.handleError));
      }

      sendMessage(msg: Message, id: String) {
        const body = JSON.stringify(msg);
     const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
     return this.http.put('http://localhost:3000/api/chat/sendMessage/' + id, body, httpOptions)
     .pipe(catchError(this.handleError));
      }
}
