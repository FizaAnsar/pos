import { Product } from "./product";
export class CartItem{
    id:number;
    menuId:number;
    menuName:string;
    qty:number;
    price:number;
    constructor(id:number, product:Product, qty:1){
        this.id =id;
        this.menuId = product.id;
        this.menuName = product.name;
        this.price = product.price;
        this.qty = qty;
    }

}