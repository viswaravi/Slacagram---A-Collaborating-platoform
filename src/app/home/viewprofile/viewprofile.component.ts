import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../../Models/post.model';
import { User } from '../../../Models/user.model';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {


  userForm: FormGroup;
  postForm: FormGroup;
  imagePreview: any;
  user: User;
  posts: Post[] = [];

  constructor(private dataservice: DataService, private postservice: PostService) { }

  ngOnInit() {
    this.imagePreview = null;
    this.dataservice.currentUser.subscribe(tuser => {
      this.user = new User(tuser._id, null, tuser.name, tuser.email, tuser.who);
    this.userForm = new FormGroup({
      'name'    : new FormControl(this.user.name, Validators.required),
      'password': new FormControl(null, Validators.required),
      'email'   : new FormControl(this.user.email, Validators.required),
      'who'     : new FormControl(this.user.who, Validators.required),
      'image'   : new FormControl(null, Validators.required)
    });
  });
  this.postForm = new FormGroup({
    'hashtag'  : new FormControl(null, Validators.required),
    'type'    : new FormControl(null, Validators.required),
    'content' : new FormControl(null, Validators.required),
    'image'   : new FormControl(null, Validators.required),
    'title'   : new FormControl(null, Validators.required)
   });
   console.log(this.user);

   return this.postservice.getPosts().subscribe((data: any) => {
         console.log(data);

          data.forEach((p) => {
            if (p.by === this.user.name) {
              if (p.type !== null) {
              this.posts.push(new Post(null, p.hashtag, p.type, p.content , null, p.title, p.by, p.imagepath));
              } else {
                this.posts.push(new Post(null, p.hashtag, p.type, p.content , null, p.title, p.by, null));
              }
            }
            });
        });

  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({'image': file});
    this.postForm.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.postForm);
    const reader = new FileReader();
    reader.onload = () => {
        this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);

  }

  post() {
    if (this.imagePreview) {
      this.postImage();
    } else {
      this.postText();
    }
  }
  postImage() {
        const val = this.postForm.value;
        const np  = new Post(null, val.hashtag, 'true' , val.content , val.image, val.title, this.user.name , null);
        this.postservice.postImage(np).subscribe(res => {
            console.log(res);
        });
    this.imagePreview = null;
    this.postForm.reset();
  }

  postText() {
    const val = this.postForm.value;
    const np  = new Post(null, val.hashtag,  null , val.content , null , val.title, this.user.name , null);
    this.postservice.postText(np).subscribe(res => {
      console.log(res);
      this.postForm.reset();
  });
  }
}
