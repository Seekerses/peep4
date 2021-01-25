import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './user';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {LoginComponent} from './login.component';

@Injectable({providedIn: 'root'})
export class LoginService {
  private user: User;

  constructor(private http: HttpClient, private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  login(user: User): boolean{
    console.log(user)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
      Authorization: ' Basic ' + btoa(user.username + ':' + user.password),
      'Access-Control-Allow-Origin': '/'});
    const options = { headers };
    this.http.get('http://localhost:7450/api/user',  options).toPromise().then(
      (data) => {
        console.log(user);
      this.user = new User(user.username, user.password);
      localStorage.setItem('user', JSON.stringify(this.getUser()));
      if (this.user){
          this.router.navigate(['/hitter']);
      }
      return true;
    },
      error => console.log(error.message));
    return false;
  }

  register(user: User): boolean{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '/' });
    const options = { headers };
    const body = JSON.stringify(user);
    this.http.post('http://localhost:7450/api/user', body, options).toPromise().then(
      (data) => {
        this.user = new User(user.username, user.password);
        localStorage.setItem('user', JSON.stringify(this.getUser()));
        if (this.user){
          this.router.navigate(['/hitter']);
        }
        return true;
      },
      error => console.log(error.message));
    return false;
  }

  logout(): void{
    this.user = null;
    localStorage.removeItem('user');
  }

  getUser(): User{
    return this.user;
  }
}
