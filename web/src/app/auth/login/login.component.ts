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
    if (!this.login || !this.password) {
      this.showMessage = true;
      this.message = 'Por favor, preencha ambos os campos.';
      return;
    }

    const userCredentials = { login, password };
    try {
     const response = await axios.post('http://localhost:5126/api/users/authenticate', userCredentials);

      console.log(response)

      if (response.status == 200 ) {
        this.router.navigate(['/']);
      } else {
        this.showMessage = true;
        this.message = 'Erro Inesperado, Tente novamente mais tarde';
      }


      if(response.status == 404) {
        this.showMessage = true;
        this.message = 'Usuário não encontrado';

        return;
      }
      if(response.status == 401) {
        this.showMessage = true;
        this.message = 'senha incorreta';

        return;
      }
      this.showMessage = true;
      this.message = 'Erro Inesperado, Tente novamente mais tarde';

    } catch (error) {


        console.error('Erro na requisição:', error);
        if ((error as AxiosError).response) {
          const axiosError = error as AxiosError;
          const response = axiosError.response as AxiosResponse;

          if (response.status == 404) {
            this.showMessage = true;
            this.message = 'Usuário não encontrado';
          }
          if (response.status == 401) {
            this.showMessage = true;
            this.message = 'Senha incorreta';
          }
          if (response.status !== 404 && response.status !== 401) {
            this.showMessage = true;
            this.message = 'Erro Inesperado, Tente novamente mais tarde';
          }
        } else {
          console.error('Erro na requisição:', error);
          this.showMessage = true;
          this.message = 'Erro Inesperado, Tente novamente mais tarde';
        }
      }
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
