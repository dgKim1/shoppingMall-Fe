export interface ProductInput {
  sku: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string[];
  status: string;
  isDeleted?: boolean;
  stock?: Record<string, number>;
}
