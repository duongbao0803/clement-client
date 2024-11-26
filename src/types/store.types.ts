export interface StoreInfo {
  managerId: number;
  name: string;
  address: string;
  taxCode: string;
  image: string;
  phoneNumber: string;
  description: string | null;
  managerEmail: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  defaultShip: number;
  id: number;
  createDate: string;
  updateDate: string | null;
  isDeleted: boolean;
  version: string;
}
