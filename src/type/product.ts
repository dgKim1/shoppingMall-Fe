export interface ProductInput {
  _id?: string;
  sku: string;
  name: string;
  image: string[];
  price: number;
  description: string;
  category: string[];
  gender?: string;
  brand?: string;
  color?: string[];
  status: string;
  isDeleted?: boolean;
  createdAt?: string;
  stock?: Record<string, number>;
}
