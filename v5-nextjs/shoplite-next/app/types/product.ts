export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}
