export interface ProductsProps {
  id?:number;
  name: string;
  price: number;
  description?: string;
  quantity:number;

  technical_specification?:string;
  brand?:string;
}
