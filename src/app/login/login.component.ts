import { Component, OnInit } from '@angular/core';
import {NgForm, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/Auth.service';
import { User } from '../../Models/user.model';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  fstate: Boolean;
  logUser: User;
  signUpForm: FormGroup;
  disp = false;

  constructor(private router: Router, private route: ActivatedRoute, private authservice: AuthService, private dataservice: DataService) { }

  ngOnInit() {
    this.disp = false;
    this.loginForm = new FormGroup({
      'email'   : new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });

    this.signUpForm = new FormGroup({
      'name'    : new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'email'   : new FormControl(null, Validators.required),
      'who'     : new FormControl(null, Validators.required)
    });
  }

  dispSignUp() {
    console.log('disp');
    this.disp = true;
  }
  closedispSignUp() {
  this.disp = false;
  }

  login() {
    const val = this.loginForm.value;
    const sUser = new User('', val.password, '', val.email, '');
    console.log(sUser);
      this.authservice.signIn(sUser).subscribe( (data: any) => {
     console.log(data);
     const k = data.obj;
        this.logUser = new User(k._id, k.password, k.name, k.email, k.who);
        this.dataservice.changeuser(this.logUser);
      this.router.navigate(['../home'], {relativeTo: this.route});
    });
  }

  signUp() {
    // console.log(this.signUpForm.value);
   const val = this.signUpForm.value;
    const newUser = new User('', val.password, val.name, val.email, val.who);
    console.log(newUser);
    this.authservice.signUp(newUser).subscribe( data => {
          console.log(data);
          this.disp = false;
         // this.router.navigate(['../login'], {relativeTo: this.route});
    });
  }

 /* signUp() {
    this.router.navigate(['../signup'], {relativeTo: this.route});
  }
  */
}
