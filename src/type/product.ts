export interface ProductType {
  _id?: string;
  sku: string;
  name: string;
  image: string[];
  price: number;
  description: string;
  categoryMain?: string;
  categorySub?: string;
  gender?: string;
  brand?: string;
  color?: string[];
  status: string;
  isDeleted?: boolean;
  createdAt?: string;
  stock?: Record<string, number>;
}
