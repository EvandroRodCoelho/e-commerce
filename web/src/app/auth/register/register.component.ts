import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { environment } from 'src/environments/environment';


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

  title = "Register";
  constructor (private router: Router,private titleService:Title){}

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
      const response = await axios.post(`${environment.apiUrl}/users`, userCredentials);

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

  onInputClick() {
    this.showMessage = false;
    this.message = '';
  }
  ngOnInit() {
    this.showMessage = false;
    this.message = '';
    this.titleService.setTitle("register");
  }
}
