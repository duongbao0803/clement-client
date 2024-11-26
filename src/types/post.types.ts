export interface PostInfo {
  productId: number;
  productName: string;
  title: string;
  content: string;
  image: string;
  id: number;
  createDate: string;
  updateDate?: string | null;
  isDeleted?: boolean;
  version?: string;
}
