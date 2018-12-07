import { Component, OnInit, DoCheck , Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {

  @Input() model: string;
  @Output() modelChange = new EventEmitter();
  home = true;

  constructor(private router: Router, private route: ActivatedRoute , private postservice: PostService) { }

  ngOnInit() {

  }


  ngDoCheck() {
    this.modelChange.next(this.model);
  }

  viewProfile() {
        this.router.navigate(['viewProfile'], {relativeTo: this.route});
  }
  goHome() {
    this.router.navigate(['/home/postchat']);
  }

 getPosts() {
    return this.postservice.getPosts().subscribe(data => {
      console.log(data);
    });
 }

}
