"use client";

import {
  useConfirmEmailMutation,
  useLoginGoogleMutation,
  useLoginMutation,
  useResendOTPMutation,
} from "@/apis/authApi";
import { notify } from "@/components/common/Notification";
import { auth } from "@/config/firebase";
import { RolesLogin } from "@/enums";
import { useDecryptCredentials } from "@/hooks/useDecryptCredentials";
import { ApiResponse } from "@/types/login.types";
import { encryptData, isErrorResponse } from "@/utils";
import { Form } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useLogin = () => {
  const provider = new GoogleAuthProvider();

  const [isShowRegister, setIsShowRegister] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isShowForgotPassword, setIsShowForgotPassword] =
    useState<boolean>(false);
  const [form] = Form.useForm();
  const [login] = useLoginMutation();
  const [loginGoogle] = useLoginGoogleMutation();
  const router = useRouter();
  const [otpCode, setOtp] = useState<string>("");
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const [confirmEmail] = useConfirmEmailMutation();
  const [resendOtp] = useResendOTPMutation();
  const [isResending, setIsResending] = useState<boolean>(false);
  const [cooldownTime, setCooldownTime] = useState<number>(0);
  const { email, password, secretKey } = useDecryptCredentials();

  const onFinish = async (values: { email: string; password: string }) => {
    setIsLoggingIn(true);
    try {
      const res: ApiResponse = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      if (res && res.httpCode === 200) {
        const accessToken = res.accessToken;
        if (accessToken) {
          const decoded: any = jwtDecode(accessToken);
          const role =
            decoded[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
          if (role !== RolesLogin.CUSTOMER) {
            notify("error", "Bạn không có quyền truy cập vào trang này", 3);
            setIsLoggingIn(false);
            return;
          } else {
            Cookies.set("accessToken", res.accessToken);
            Cookies.set("refreshToken", res.refreshToken);
            if (rememberMe) {
              const encryptedEmail = encryptData(values.email, secretKey);
              const encryptedPassword = encryptData(values.password, secretKey);
              Cookies.set("email", encryptedEmail);
              Cookies.set("password", encryptedPassword);
            }
            router.replace("/");
            notify("success", "Đăng nhập thành công", 3);
            setIsLoggingIn(false);
          }
        }
      }
    } catch (err: unknown) {
      if (isErrorResponse(err)) {
        if (
          err.data.message.includes(
            "Bạn phải xác nhận email trước khi đăng nhập vào hệ thống. OTP đã gửi qua email.",
          )
        ) {
          notify("error", `${err.data.message}`, 3);
          setIsLoggingIn(false);
          setTimeout(() => {
            setIsDrawerVisible(true);
          }, 1000);
          return;
        }
        setIsLoggingIn(false);
        notify("error", `${err.data.message}`, 3);
      } else {
        setIsLoggingIn(false);
        notify("error", "An unknown error occurred", 3);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const result = await signInWithPopup(auth, provider);
      const credentials = await result.user.getIdTokenResult();
      const accessToken = credentials.token;
      const res = await loginGoogle(JSON.stringify(accessToken)).unwrap();
      if (res && res.httpCode === 200) {
        Cookies.set("accessToken", res.accessToken);
        Cookies.set("refreshToken", res.refreshToken);
        router.replace("/");
        notify("success", `${res.message}`, 2);
      }
    } catch (err) {
      if (isErrorResponse(err)) {
        notify("error", `${err.data.message}`, 3);
      }
    }
  };

  const handleOTPSubmit = async () => {
    const email = form.getFieldValue("email");
    let information = { email, otpCode };
    if (otpCode.length < 6) {
      notify("warning", "Vui lòng nhập otp", 2);
      return;
    }
    try {
      const res = await confirmEmail(information).unwrap();
      if (res && res.httpCode === 200) {
        const accessToken = res.accessToken;
        if (accessToken) {
          Cookies.set("accessToken", res.accessToken);
          Cookies.set("refreshToken", res.refreshToken);
          router.push("/");
          notify("success", "Đăng nhập thành công", 2);
        }
      }
    } catch (err) {
      if (isErrorResponse(err)) {
        notify("error", `${err.data.message}`, 3);
      }
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
  };

  const handleResendMail = async () => {
    const email = form.getFieldValue("email");
    if (!email) {
      notify("warning", "Vui lòng nhập email", 3);
      return;
    }
    if (isResending) {
      notify(
        "warning",
        `Vui lòng chờ ${cooldownTime} giây trước khi gửi lại mã OTP`,
        3,
      );
      return;
    }
    setIsResending(true);
    setCooldownTime(30);
    try {
      const res = await resendOtp(JSON.stringify(email)).unwrap();
      if (res && res.httpCode === 200) {
        notify("success", `${res.message}`, 3);
        const countdownInterval = setInterval(() => {
          setCooldownTime((prev) => {
            if (prev === 1) {
              clearInterval(countdownInterval);
              setIsResending(false);
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (err) {
      if (isErrorResponse(err)) {
        notify("error", `${err.data.message}`, 3);
      } else {
        notify("error", `${err}`, 3);
      }
    }
  };

  return {
    form,
    isShowRegister,
    setIsShowRegister,
    isLoggingIn,
    rememberMe,
    setRememberMe,
    isShowForgotPassword,
    setIsShowForgotPassword,
    otpCode,
    setOtp,
    isDrawerVisible,
    setIsDrawerVisible,
    isResending,
    cooldownTime,
    onFinish,
    handleGoogleSignIn,
    handleOTPSubmit,
    handleDrawerClose,
    handleResendMail,
    email,
    password,
  };
};

export default useLogin;
