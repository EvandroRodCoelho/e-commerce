import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import axios from 'axios';
import { ProductsProps } from 'src/types/Products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  products:ProductsProps[] = [];
  searchTerm: string = '';
  title= 'Home';
  constructor(private titleService:Title) {}
  async getProducts() {
    const response = await axios.get("http://localhost:5126/api/products");

    console.log(response)
    this.products = response.data;

    this.products = this.products.filter(product => product.quantity > 0 );

    console.log(this.products);
  }
  clearSearch() {
    this.searchTerm = '';
  }
  filterProducts() {
    if (this.searchTerm.trim() === '') {
      return this.products.filter(product => product.quantity > 0);
    }

    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      product.quantity > 0
    );
  }
  ngOnInit() {
    this.getProducts();
    this.titleService.setTitle(this.title);
  }
}
