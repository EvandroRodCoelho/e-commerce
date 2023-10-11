import { ProductsProps } from "./Products";

export interface CartProduct {
  product:ProductsProps
  cartId:number,
  selected:boolean;
  quantityOnCart:number;
}
