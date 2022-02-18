import { IProducts } from "../types/types";

export class Product implements IProducts {
  title: string;
  thumbnail: string;
  price: number;
  constructor (title: string, price: number, thumbnail = 'https://picsum.photos/200') {
    this.title = title;
    this.thumbnail = thumbnail,
    this.price = price
  }
}