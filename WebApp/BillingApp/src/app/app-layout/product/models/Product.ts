import { ProductSet } from './ProductSet'

export class Product{
    public constructor(init?: Partial<Product>) {
        Object.assign(this, init);
    }
    id:number;
    name:string;
    itemCode:string;
    hsn:string;
    tax:number;
    productSets:ProductSet[]
}