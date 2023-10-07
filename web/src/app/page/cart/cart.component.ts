import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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


  @Output() countChanged = new EventEmitter<number>();
  products: Product[] = [
    { name: 'Product 1', price: 100, quantity: 10, brand:"Marca 1",selected:false },
    { name: 'Product 2', price: 150, quantity: 0, brand:"Marca 2",selected:false },
  ];

  calculateTotal(): number {
    let total = 0;
    for (const product of this.products) {
      total += product.price * product.quantity;
    }
    return total;
  }

  increment(product: Product) {
    product.quantity++;
  }

  decrement(product: Product) {
    if (product.quantity > 0) {
      product.quantity--;
    }
  }
  checkboxChanged(product: Product) {

    if (product.quantity !== 0) {
      product.selected = !product.selected;
    }
  }
  ngOnInit() {
    this.calculateTotal();
  }
  completePurchase() {
    const selectedProducts = this.products.filter(product => product.selected);


    console.log(selectedProducts);
  }

}
