import { Component } from '@angular/core';
import { getUserDataFromLocalStorage } from 'src/app/utils/getUserOnlocalStorage';
import { User } from 'src/types/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  authenticated: boolean = !!localStorage.getItem('user');
  user: User | null = getUserDataFromLocalStorage();
}
