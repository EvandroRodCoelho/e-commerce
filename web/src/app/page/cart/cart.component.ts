import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { CartGetResponse } from 'src/types/CartGetResponse';
import { CartProduct } from 'src/types/CartProduct';
import { User } from 'src/types/User';
interface Product {
  name: string;
  price: number;
  quantity: number;
  brand: string;
  selected: boolean;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {
  count: number = 0;

  totalValue: number = 0;

  authenticated: boolean = !!localStorage.getItem('user');

  userString = localStorage.getItem('user');
  user: User | null = this.userString ? JSON.parse(this.userString) : null;

  @Output() countChanged = new EventEmitter<number>();
  CartProduct: CartProduct[] = [];
  cartList:CartGetResponse[] = [];

  calculateTotal(): number {
    let total = 0;
    for (const product of this.CartProduct) {
      total += product.product.price * product.quantityOnCart;
    }
    return total;
  }

  increment(product:CartProduct ) {
    product.quantityOnCart++;
  }

  decrement(product: CartProduct) {
    if (product.quantityOnCart > 0) {
      product.quantityOnCart--;
    }
  }
  checkboxChanged(product: CartProduct) {

    if (product.quantityOnCart !== 0) {
      product.selected = !product.selected;
    }
  }

  completePurchase() {
    const selectedProducts = this.CartProduct.filter(product => product.selected);
    console.log("ola")

    console.log(selectedProducts);
  }
  async getProductsOnCart() {
    const response = await axios.get(`http://localhost:5126/api/ShoppingCartItem/${this.user?.id}`);


    this.cartList = response.data;



    this.cartList.forEach(async product => {
      const responseProduct = await axios.get(`http://localhost:5126/api/products/${product.productId}`);

      const responseProductData: Product = responseProduct.data;

      this.CartProduct.push({ product:{
        brand: responseProductData.brand,
        name: responseProductData.name,
        price: responseProductData.price,
        quantity: responseProductData.quantity
      },
      quantityOnCart:product.quantity,
      selected:false
      });
    });




  }

  async ngOnInit() {


    if(this.authenticated) {
      await this.getProductsOnCart();
    }

    this.calculateTotal();

    console.log(this.CartProduct)
  }
}
