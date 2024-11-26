export interface Unit {
  id: number;
  name: string;
  code: string;
}

export interface ProductPrice {
  id: number;
  productId: number;
  unitId: number;
  price: number;
  unit: Unit;
}

export interface Brand {
  id: number;
  name: string;
  createDate?: string;
  updateDate?: string | null;
  isDeleted?: boolean;
  version?: string;
}

export interface Category {
  id: number;
  code: string;
  name: string;
  createDate?: string;
  updateDate?: string | null;
  isDeleted?: boolean;
  version?: string;
}

export interface ProductInfo {
  id: number;
  sku: string;
  name: string;
  image: string;
  categoryId: number;
  brandId: number;
  description: string;
  quantity: number;
  storeId: number;
  soldQuantity: number;
  brand: Brand;
  category: Category;
  storeName: string;
  price: ProductPrice[];
  createDate?: string;
  updateDate?: string | null;
  isDeleted?: boolean;
  version?: string;
  rating?: number;
  totalProductPrice?: number;
}
