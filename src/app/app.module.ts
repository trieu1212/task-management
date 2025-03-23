import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment.development';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { LoginComponent } from './features/auth/login/login.component';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { ProjectListComponent } from './features/project/project-list/project-list.component';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { provideHttpClient } from '@angular/common/http';
import { AddFormComponent } from './shared/components/add-form/add-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { RegisterComponent } from './features/auth/register/register.component';
import { TaskListComponent } from './features/task/task-list/task-list.component';
import { FillterTaskPipe } from './shared/pipe/fillter-task.pipe';
import { EditTaskFormComponent } from './shared/components/edit-task-form/edit-task-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    LoginComponent,
    ProjectListComponent,
    HighlightDirective,
    AddFormComponent,
    RegisterComponent,
    TaskListComponent,
    FillterTaskPipe,
    EditTaskFormComponent
  ],
  imports: [
    NgIf,
    NgFor,
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatTableModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideHttpClient(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
