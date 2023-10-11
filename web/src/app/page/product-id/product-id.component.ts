import { Component } from '@angular/core';
import { ProductsProps } from 'src/types/Products';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-product-id',
  templateUrl: './product-id.component.html',
  styleUrls: ['./product-id.component.css']
})
export class ProductIdComponent {

  product:ProductsProps= {
    brand:'',
    description:'',
    id:0,
    name:'',
    price:0,
    quantity:0,
    technical_specification:''
  };
  currentQuantity = 0;
  constructor(private route: ActivatedRoute,private router: Router) { }

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get("id");
    this.product.id = idParam ? parseInt(idParam, 10) : undefined;

    if(!this.product.id) {
      this.router.navigate(['/']);
    }

    const response = await  axios.get(`http://localhost:5126/api/products/${this.product.id}`);

    if(!response.data) {
      this.router.navigate(['/']);
    }
    this.product = response.data;
    console.log(this.product);
  }
  increment() {
    if(this.currentQuantity < this.product.quantity) {
      this.currentQuantity++;
    }

  }

  decrement() {
    if (this.currentQuantity > 0) {
      this.currentQuantity--;
    }
  }

  async addToCart() {
    const userObject = JSON.parse(localStorage.getItem('user') || 'null');

    if(userObject === null) {
        console.log("Usuário inválido");
        return;
    }

    if(this.currentQuantity <= 0) {
      alert("Selecione a quantidade");
      return;
    }
    console.log("Usuário válido, adicione ao carrinho...");

    try {
        const response = await axios.post('http://localhost:5126/api/ShoppingCartItem/', {
            userId: userObject.id,
            productId: this.product.id,
            quantity: this.currentQuantity
        });

        console.log("Produto adicionado ao carrinho com sucesso:", response.data);
    } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
    }
}


}
