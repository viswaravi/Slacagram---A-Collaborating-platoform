import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ViewprofileComponent } from './home/viewprofile/viewprofile.component';
import { AuthService } from './services/Auth.service';
import {  routing } from './app.routing';
import { PostService } from './services/post.service';
import { ChatService } from './services/chat.service';
import { DataService } from './services/data.service';
import { PostchatComponent } from './home/postchat/postchat.component';
import { ViewfprofileComponent } from './home/viewfprofile/viewfprofile.component';
import { FilterPipe } from './pipes/filter.pipe';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: '', options: {   reconnection: false } };

@NgModule({
  declarations: [
    FilterPipe,
    AppComponent,
    HomeComponent,
    LoginComponent,
    ViewprofileComponent,
    PostchatComponent,
    ViewfprofileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    AuthService,
    PostService,
    ChatService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
