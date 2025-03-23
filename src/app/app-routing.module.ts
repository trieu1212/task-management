import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ProjectListComponent } from './features/project/project-list/project-list.component';
import { authGuard } from './core/guard/auth.guard';
import { guestGuard } from './core/guard/guest.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate:[guestGuard] },
  { path: 'home', component: ProjectListComponent, canActivate:[authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
