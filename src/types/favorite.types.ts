export interface FavoriteProps {
  userId: number;
  productId: number;
  productName: string;
  brandName: string;
  categoryName: string;
  storeName: string;
  productPrices: [
    {
      id: number;
      productId: number;
      unitId?: number;
      price?: number;
      unit?: null;
    },
  ];
  id: number;
  isDeleted: false;
  productImage: string;
}
