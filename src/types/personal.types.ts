import { Dayjs } from "dayjs";

export interface UserInfo {
  email: string;
  confirmEmail: boolean;
  googleId: string | null;
  avatar: string | null;
  fullName: string;
  unsignFullName: string;
  address: string | null;
  gender: string | null | number;
  phoneNumber: string;
  dob?: string | number | Date | Dayjs | null | undefined;
  role: "CUSTOMER";
  status: "ACTIVE" | "INACTIVE";
  id: number;
  createDate: string;
  updateDate: string | null;
  isDeleted: boolean;
  version: string;
}

export interface CartUser {
  storeName?: string;
  email: string;
  fullName: string;
  customerAddress: string;
  customerPhone: string;
}
