export type Image  ={
  url: string;
  name: string;
}

export type Product = {
  id?: string;
  name: string;
  number: string;
  description: string;
  images: Image[];
}
