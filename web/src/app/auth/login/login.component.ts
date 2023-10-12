import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title='Login';
  login='';
  password='';

  showMessage = false;
  message = '';

  constructor(private router: Router, private titleService:Title) { }
  async loginUser(login: string, password: string) {
    localStorage.removeItem('user');
    if (!login || !password) {
      this.showErrorMessage('Por favor, preencha ambos os campos.');
      return;
    }
    try {
      const userCredentials = { login, password };
      const response = await axios.post(`${environment.apiUrl}/users/authenticate`, userCredentials);

      if (response.status == 200) {
        console.log(response.data)
        const localStorageData = { user:response.data.user, token:response.data.token}
        localStorage.setItem('user', JSON.stringify(localStorageData));
        this.router.navigate(['/']);
      } else {
        if (response.status == 404) {
          this.showErrorMessage('Usuário não encontrado');
        } else if (response.status == 401) {
          this.showErrorMessage('Senha incorreta');
        } else {
          this.showErrorMessage('Erro Inesperado, Tente novamente mais tarde');
        }
      }

    } catch (error) {
      console.error('Erro na requisição:', error);

      if ((error as AxiosError).response) {
        const response = (error as AxiosError).response as AxiosResponse;

        if (response.status == 404) {
          this.showErrorMessage('Usuário não encontrado');
        } else if (response.status == 401) {
          this.showErrorMessage('Senha incorreta');
        } else {
          this.showErrorMessage('Erro Inesperado, Tente novamente mais tarde');
        }
      } else {
        this.showErrorMessage('Erro Inesperado, Tente novamente mais tarde');
      }
    }
  }

  private showErrorMessage(message: string) {
    this.showMessage = true;
    this.message = message;

    console.log(this.message);
  }


  onInputClick() {
    this.showMessage = false;
    this.message = '';
  }
  ngOnInit() {
    this.showMessage = false;
    this.message = '';
    this.titleService.setTitle(this.title)
  }
}
