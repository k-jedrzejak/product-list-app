process.env.NODE_ENV = "production"

export const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://product-list-app-azure.vercel.app/api/products'
  : 'http://localhost:3000/api/products';
