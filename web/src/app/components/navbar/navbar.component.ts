import { Component } from '@angular/core';
import { User } from 'src/types/User';
interface Usuario {
  id: number;
  login: string;
  password: string;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  authenticated: boolean = !!localStorage.getItem('user');

  userString = localStorage.getItem('user');
  user: User | null = this.userString ? JSON.parse(this.userString) : null;

}
