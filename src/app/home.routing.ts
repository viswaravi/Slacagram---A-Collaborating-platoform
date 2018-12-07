import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { ViewprofileComponent } from './home/viewprofile/viewprofile.component';
import { ViewfprofileComponent } from './home/viewfprofile/viewfprofile.component';
import { PostchatComponent } from './home/postchat/postchat.component';

export const homeRoutes: Routes = [
    {path: '', redirectTo: 'postchat', pathMatch: 'full'},
    { path: 'viewProfile'   , component: ViewprofileComponent},
    { path: 'viewfProfile'   , component: ViewfprofileComponent},
    { path: 'postchat'   , component: PostchatComponent},
    {path: '**', redirectTo: 'postchat', pathMatch: 'full'},
];
