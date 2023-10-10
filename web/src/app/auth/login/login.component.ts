import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosError, AxiosResponse } from 'axios';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title='login';
  login='';
  password='';

  showMessage = false;
  message = '';

  constructor(private router: Router) { }
  async loginUser(login: string, password: string) {
    localStorage.removeItem('user');

    try {
      if (!login || !password) {
        this.showErrorMessage('Por favor, preencha ambos os campos.');
        return;
      }

      const userCredentials = { login, password };
      const response = await axios.post('http://localhost:5126/api/users/authenticate', userCredentials);

      if (response.status == 200) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
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
  }


  onInputClick() {
    this.showMessage = false;
    this.message = '';
  }
  ngOnInit() {
    this.showMessage = false;
    this.message = '';
  }
}
