import { ErrorResponse } from "@/types/login.types";
import { FormInstance } from "antd";
import CryptoJS from "crypto-js";

export function isErrorResponse(error: unknown): error is ErrorResponse {
  return (error as ErrorResponse).data !== undefined;
}

export function encryptData(
  data: string | CryptoJS.lib.WordArray,
  key: string | CryptoJS.lib.WordArray | undefined,
) {
  if (key === undefined) {
    throw new Error("Key cannot be undefined");
  }
  return CryptoJS.AES.encrypt(data, key).toString();
}

export function decryptData(
  ciphertext: string | CryptoJS.lib.CipherParams | undefined,
  key: string | CryptoJS.lib.WordArray,
) {
  try {
    if (ciphertext === undefined) {
      throw new Error("Ciphertext cannot be undefined");
    }
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return null;
  }
}

export const PriceFormat = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export function formatTimestamp(timestampStr: string): string {
  const timestamp = new Date(timestampStr);
  return timestamp.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatTimestampWithHour(timestampStr: string): string {
  const timestamp = new Date(timestampStr);
  return timestamp.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export const validatePassword =
  (form: FormInstance) => (_: unknown, value: string) => {
    const password = form.getFieldValue("password");
    if (value && password && value !== password) {
      return Promise.reject("Mật khẩu không trùng");
    }
    return Promise.resolve();
  };
