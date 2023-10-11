import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { CartGetResponse } from 'src/types/CartGetResponse';
import { CartProduct } from 'src/types/CartProduct';
import { ProductsProps } from 'src/types/Products';
import { User } from 'src/types/User';

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
  cartList: CartGetResponse[] = [];
  selectedProducts: CartProduct[] = [];
  total: number = 0;

  calculateTotal(): number {
    const total = this.selectedProducts.reduce((accumulator, product) => {
      console.log(product);
      return accumulator + (product.product.price * product.quantityOnCart);
    }, 0);

    return total;
  }

  increment(product: CartProduct) {
    if (product.quantityOnCart < product.product.quantity) {
      product.quantityOnCart++;
      this.total = this.calculateTotal();
    }
  }

  decrement(product: CartProduct) {
    if (product.quantityOnCart > 0) {
      product.quantityOnCart--;
      this.total = this.calculateTotal();
    }
  }

  checkboxChanged(product: CartProduct) {
    if (product.quantityOnCart !== 0) {
      product.selected = !product.selected;
    }

    this.selectedProducts = this.CartProduct.filter(product => product.selected);

    this.total = this.calculateTotal();
  }

  async completePurchase() {
    this.selectedProducts = this.CartProduct.filter(product => product.selected);

    if (this.selectedProducts.length <= 0) {
      alert("Selecione os produtos");
      return;
    }

    try {
      this.selectedProducts.forEach(async selectedProduct => {
      if(selectedProduct.quantityOnCart > selectedProduct.product.quantity) {
        alert(`produto ${selectedProduct.product.name} quantidade superior ao estoque:`);
        return;
      }
        const response = await axios.post(`http://localhost:5126/api/orderItem/`, {
          TotalPrice: selectedProduct.quantityOnCart * selectedProduct.product.price,
          ShoppingCartItemId: selectedProduct.cartId
        });
        console.log(response.data);
      });

      location.reload();
    } catch (error) {
      alert("Erro ao completar a compra");
    }

  }

  async getProductsOnCart() {
    const response = await axios.get(`http://localhost:5126/api/ShoppingCartItem/${this.user?.id}`);

    this.cartList = response.data;

    this.cartList.forEach(async (product, index) => {
      const responseProduct = await axios.get(`http://localhost:5126/api/products/${product.productId}`);

      const responseProductData: ProductsProps = responseProduct.data;

      this.CartProduct.push({
        product: {
          brand: responseProductData.brand,
          name: responseProductData.name,
          price: responseProductData.price,
          quantity: responseProductData.quantity
        },
        quantityOnCart: product.quantity,
        selected: false,
        cartId: this.cartList[index].id
      });
    });
  }

  async ngOnInit() {
    if (this.authenticated) {
      await this.getProductsOnCart();
    }

    this.calculateTotal();
  }


  async deleteCart(id:number) {
    try {
      const response = await axios.delete(`http://localhost:5126/api/ShoppingCartItem/${id}`);

      if(response.status == 204 || response.status == 200) {
        location.reload();
      }

    } catch (error) {
      alert("erro ao deletar o produto")
    }


  }
}
