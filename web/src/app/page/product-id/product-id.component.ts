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

}
