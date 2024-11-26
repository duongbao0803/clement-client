import { ProductInfo } from "./product.types";

export interface OrderInfo {
  bankCode: string;
  bankTranNo: string;
  code: string;
  createDate: string;
  customerAddress: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  discount?: null;
  id: number;
  isDeleted: boolean;
  orderDetails: [
    {
      productUnit: string;
      product: {
        name: string;
        unit: string;
      };
      price: number;
      quantity: number;
    },
  ];
  paymentDate: string;
  paymentMethod: string;
  paymentStatus: string;
  shipFee?: null;
  status: string;
  storeAddress: string;
  storeId: number;
  storeName: string;
  storePhone: string;
  total: number;
  transactionNo: string;
  updateDate?: string;
  userId: number;
  version: string;
  voucherId?: null;
  productUnit?: string;
}
