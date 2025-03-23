import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ProjectListComponent } from './features/project/project-list/project-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: ProjectListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
