import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../../Models/user.model';

@Injectable()
export class DataService {

  private cUser = new BehaviorSubject<User>(null);
  currentUser = this.cUser.asObservable();


  constructor() { }

  changeuser(usr: User) {
    this.cUser.next(usr);
  }
}
