export interface Image {
  url: string;
  name: string;
}

export interface Product {
  id?: string;
  name: string;
  number: string;
  description: string;
  images: Image[];
}
