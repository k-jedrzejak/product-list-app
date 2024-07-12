export interface Image {
  url: string;
  name: string;
}

export interface Product {
  name: string;
  number: string;
  description: string;
  images: Image[];
}
