import { ProductsProps } from "./Products";

export interface CartProduct {
  product:ProductsProps
  selected:boolean;
  quantityOnCart:number;
}
