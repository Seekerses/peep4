import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  title = 'lab4front';
  loginForm: FormGroup;
  hoursText: HTMLSpanElement;
  minText: HTMLSpanElement;
  secText: HTMLSpanElement;
  constructor(private http: HttpClient, private loginService: LoginService){
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  clock(): void {

    if (this.hoursText !== undefined){
      const date = new Date();

      this.hoursText.innerHTML = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString();
      this.minText.innerHTML = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();
      this.secText.innerHTML = date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds().toString();
    }
  }

  onSubmit(buttonType: any): void {
    if (buttonType === 'login'){
      if (!this.loginService.login(new User(this.loginForm.controls.username.value, this.loginForm.controls.password.value))) {
        if(!this.loginService.getUser()){
          this.loginError('Неправильный логин/пароль');
        }
      }
    }
    if (buttonType === 'register'){
      if (!this.loginService.register(new User(this.loginForm.controls.username.value, this.loginForm.controls.password.value))) {
        if(!this.loginService.getUser()) {
          this.loginError('Данный пользователь уже зарегистрирован');
        }
      }
    }
  }

  ngOnInit(): void {
    this.hoursText = document.getElementById('hours');
    this.minText = document.getElementById('min');
    this.secText = document.getElementById('sec');
    this.clock();
    window.setInterval(this.clock, 11000);
  }
  loginError(errorMsg: any): void{
    document.getElementById('errContainer').innerHTML = errorMsg;
  }
}
