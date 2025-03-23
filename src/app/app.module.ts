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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    LoginComponent,
    ProjectListComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
