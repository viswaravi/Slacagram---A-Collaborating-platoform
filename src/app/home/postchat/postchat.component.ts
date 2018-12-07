import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../../Models/post.model';
import { post } from 'selenium-webdriver/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatRoom } from '../../../Models/chatroom.model';
import { ChatService } from '../../services/chat.service';
import { DataService } from '../../services/data.service';
import { User } from '../../../Models/user.model';
import { Message } from '../../../Models/message.model';
import { Socket } from 'ngx-socket-io';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-postchat',
  templateUrl: './postchat.component.html',
  styleUrls: ['./postchat.component.css']
})
export class PostchatComponent implements OnInit {
  private url = 'http://localhost:8080';
    private socket;
  constructor(private postservice: PostService, private router: Router, private route: ActivatedRoute,
    private chatservice: ChatService, private dataservice: DataService,  ) {
     // this.socket = io(this.url);
    this.chatservice.loadChatTags().subscribe((data: any) => {
      this.chatTags = [];
        data.forEach((room: ChatRoom ) => {
                this.chatTags.push(room.hashTag);
          });
    });

    this.dataservice.currentUser.subscribe(tuser => {
      this.currentUser = new User(tuser._id, null, tuser.name, tuser.email, tuser.who);
    });
    }

  posts: Post[] = [];
  searchHash = '';
  chatmsg = '';
  currentChatRoom: ChatRoom;
  chatTags: String[] = [];
  currentTag = ' ';
  newTag = '';
  currentUser: User;
  newRoom: ChatRoom;
  newMessage: Message;
  messages: Message[] = [];

  ngOnInit() {
    return this.postservice.getPosts().subscribe((data: any) => {
//      console.log(data);
      data.forEach((p) => {
          if (p.type !== null) {
          this.posts.push(new Post(null, p.hashtag, p.type, p.content , null, p.title, p.by, p.imagepath));
          } else {
            this.posts.push(new Post(null, p.hashtag, p.type, p.content , null, p.title, p.by, null));
          }
        });
    });
  }

loadChatTags() {
  console.log('Loading tags');
  this.chatservice.loadChatTags().subscribe((data: any) => {
    this.chatTags = [];
      data.forEach((room: ChatRoom ) => {
              this.chatTags.push(room.hashTag);
        });
  });
  console.log(this.chatTags);
}

  createNewTag() {

    console.log(this.newTag);
    this.newRoom = new ChatRoom(null, this.newTag, null, this.currentUser.name, [null]);

    this.chatservice.createNewTag(this.newRoom).subscribe(data => {
      console.log(data);
      this.loadChatTags();
    });

  }

  viewProfile() {
    this.router.navigate(['../viewProfile'], {relativeTo: this.route});
  }

  sendmsg() {
        console.log(new Date());
        this.newMessage = new Message(this.currentUser.name, this.chatmsg, new Date());
        this.chatservice.sendMessage(this.newMessage, this.currentChatRoom._id).subscribe(data => {
            console.log(data);
            this.chatmsg = '';
            this.socket.emit('new-message', this.currentTag);
        }, null, () => {
           this.loadChatRoom();
        });
  }
  /*
  public getMessages = () => {
    return Observable.create((observer) => {
        this.socket.on('new-message', (message) => {
            console.log('New Message Emitted');
        });
    });
  }
*/
  loadChatRoom() {
        console.log('Loading chat Room');
        this.chatservice.loadChatRoom(this.currentTag).subscribe((data: any) => {
               this.currentChatRoom = new ChatRoom(data._id, data.hashTag, null , data.createdBy, null);
           //  console.log(data);
           this.messages = [ ];
              data.messages.forEach(msg => {
                  this.messages.push(new Message(msg.by, msg.text, msg.time));
              });
              }, null, () => {
                  console.log(this.messages);
              });
  }
}
