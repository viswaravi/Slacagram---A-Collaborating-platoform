import {Router, RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { homeRoutes } from './home.routing';
const appRoutes: Routes = [
    {path: '' , redirectTo: '/login', pathMatch: 'full'},
    {  path: 'login' , component: LoginComponent },
    {  path: 'home'  , component: HomeComponent , children: homeRoutes},
    {path: '**', redirectTo: '/notfound', pathMatch: 'full'},
    {path: 'notfound', component: HomeComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
