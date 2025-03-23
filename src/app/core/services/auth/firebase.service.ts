import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, UserCredential } from '@angular/fire/auth'
import { Database, ref, set } from '@angular/fire/database';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { IUser } from '../../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth: Auth,
    private db: Database,
    private router: Router
  ) { }

  register(name: string, email: string, password: string): Observable<void> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password).then((userCredential) => {
        const userId = userCredential.user.uid
        return set(
          ref(this.db, 'users/' + userId),
          {
            id: userId,
            name: name,
            email: email,
            password: password,
            createdAt: new Date().toISOString()
          }
        )
      })
    )
  }
  login(email: string, password: string): Observable<UserCredential> {
    return from(
      (signInWithEmailAndPassword(this.auth, email, password)).then((userCredential) => {
        const data: Pick<IUser, "id" | "email" | "name"> = {
          id: userCredential.user.uid,
          name: userCredential.user.displayName || "",
          email: userCredential.user.email || "",
        }
        localStorage.setItem('user', JSON.stringify(data))
        return userCredential
      })
    )
  }

  logout(): Observable<void> {
    return from(
      signOut(this.auth).then(() => {
        localStorage.removeItem('user')
        this.router.navigate(['/login'])
      })
    )
  }

  getCurrentUser(): Observable<User | null> {
    return new Observable((ob) => {
      this.auth.onAuthStateChanged(user => {
        if (user) {
          const data: Pick<IUser, "id" | "email" | "name"> = {
            id: user.uid,
            name: user.displayName || "",
            email: user.email || "",
          }
          localStorage.setItem('user', JSON.stringify(data))
        } else {
          localStorage.removeItem('user')
        }
        ob.next(user)
      })
    })
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }
}
