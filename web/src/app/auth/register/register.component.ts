import { Component } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosError, AxiosResponse } from 'axios';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  login= '';
  password= '';
  confirmPassword= '';

  showMessage=false;
  message = '';

  constructor (private router: Router){}

  async register() {
    if (!this.login || !this.password || !this.confirmPassword) {
      this.showMessage = true;
      this.message = 'Por favor, preencha todos os campos.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.showMessage = true;
      this.message = 'As senhas não coincidem.';
      return;
    }

    const userCredentials = { login: this.login, password: this.password };
    try {
      const response = await axios.post('http://localhost:5126/api/users', userCredentials);

      if (response.status === 201) {
        this.showMessage = true;
        this.message = 'Usuário registrado com sucesso.';

        this.router.navigate(['/login']);
      } else {
        console.error('Erro ao registrar usuário:', response);
      }

    } catch (error) {
      if ((error as AxiosError).response) {
        const axiosError = error as AxiosError;
        const response = axiosError.response as AxiosResponse;

        if (response.status == 400) {
          this.showMessage = true;
          this.message = 'Erro ao criar usuário: Verifique os dados inseridos.';
        } else {
          this.showMessage = true;
          this.message = 'Erro inesperado. Tente novamente mais tarde.';
        }
      } else {
        console.error('Erro na requisição:', error);
        this.showMessage = true;
        this.message = 'Erro inesperado. Tente novamente mais tarde.';
      }
    }
  }
}
