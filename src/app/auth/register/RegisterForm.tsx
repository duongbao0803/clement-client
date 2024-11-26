"use client";

import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Form, Spin } from "antd";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import { InputCustom } from "@/components/ui/input";
import { ButtonCustom } from "@/components/ui/button";
import { notify } from "@/components/common/Notification";
import LoginForm from "@/app/auth/login/LoginForm";
import {
  useConfirmEmailMutation,
  useRegisterMutation,
  useResendOTPMutation,
} from "@/apis/authApi";
import { isErrorResponse } from "@/utils";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useValidateFieldsMatch } from "@/hooks/useValidateFieldMatch";

interface IProps {
  isShowRegister: boolean;
  setIsShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm: React.FC<IProps> = ({
  isShowRegister,
  setIsShowRegister,
}) => {
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [captchaVerified, setCaptchaVerified] = useState<boolean>(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const [otpCode, setOtp] = useState<string>("");
  const [confirmEmail] = useConfirmEmailMutation();
  const [resendOtp] = useResendOTPMutation();
  const [isResending, setIsResending] = useState<boolean>(false);
  const [cooldownTime, setCooldownTime] = useState<number>(0);
  const [register] = useRegisterMutation();
  const router = useRouter();

  const [form] = Form.useForm();
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  const { validateFieldsMatch } = useValidateFieldsMatch(form);

  const onCaptchaChange = (value: string | null) => {
    if (value) {
      setCaptchaVerified(true);
    } else {
      setCaptchaVerified(false);
    }
  };

  const onFinish = async (values: {
    email: string;
    fullName: string;
    password: string;
    phoneNumber: string;
    confirmPassword: boolean;
  }) => {
    const { confirmPassword, ...information } = values;
    if (!captchaVerified) {
      notify("warning", "Vui lòng xác nhận reCAPTCHA", 3);
      return;
    }

    try {
      setIsSigningUp(true);
      const res = await register(values).unwrap();
      if (res && res.httpCode === 200) {
        notify(
          "success",
          "Vui lòng kiểm tra hòm thư (hoặc Thư rác) để lấy mã OTP",
          3,
        );
        setTimeout(() => {
          setIsDrawerVisible(true);
        }, 1000);
        setIsSigningUp(false);
      }
    } catch (err: unknown) {
      if (isErrorResponse(err)) {
        setIsSigningUp(false);
        notify("error", `${err.data.message}`, 3);
      } else {
        setIsSigningUp(false);
        notify("error", `${err}`, 3);
      }
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
  };

  const handleResendMail = async () => {
    const email = form.getFieldValue("email");
    if (!email) {
      notify("warning", "Vui lòng nhập email", 1);
      return;
    }
    if (isResending) {
      notify(
        "warning",
        `Vui lòng chờ ${cooldownTime} giây trước khi gửi lại mã OTP`,
        2,
      );
      return;
    }
    setIsResending(true);
    setCooldownTime(30);
    try {
      const res = await resendOtp(JSON.stringify(email)).unwrap();
      if (res && res.httpCode === 200) {
        notify("success", `${res.message}`, 2);
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

  const handleOTPSubmit = async () => {
    const email = form.getFieldValue("email");
    let information = { email, otpCode };
    if (otpCode.length < 6) {
      notify("warning", "Vui lòng nhập otp", 1);
      return;
    }
    try {
      const res = await confirmEmail(information).unwrap();
      if (res && res.httpCode === 200) {
        const accessToken = res.accessToken;
        if (accessToken) {
          Cookies.set("accessToken", res.accessToken);
          Cookies.set("refreshToken", res.refreshToken);
          notify("success", "Đăng nhập thành công", 2);
          router.push("/");
        }
      }
    } catch (err) {
      if (isErrorResponse(err)) {
        notify("error", `${err.data.message}`, 3);
      }
    }
  };

  return (
    <>
      {isShowRegister ? (
        <section className="py-5">
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
            className="my-5"
          >
            <h1 className="text-center text-3xl font-bold text-primary transition-all duration-500 lg:text-4xl">
              ĐĂNG KÝ
            </h1>
          </motion.div>
          <Form
            name="register_form"
            className="w-full"
            form={form}
            onFinish={onFinish}
          >
            <motion.div
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Form.Item
                name="email"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email",
                  },
                  {
                    type: "email",
                    message: "Email không đúng định dạng",
                  },
                ]}
                colon={true}
                labelCol={{ span: 24 }}
                className="formItem"
              >
                <InputCustom
                  placeholder="Email"
                  type="email"
                  className="hover:border-primary focus:border-primary"
                  autoFocus
                />
              </Form.Item>
            </motion.div>
            <motion.div
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Form.Item
                name="fullName"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập họ và tên",
                  },
                  {
                    min: 8,
                    message: "Tên người dùng ít nhất 8 ký tự",
                  },
                ]}
                colon={true}
                labelCol={{ span: 24 }}
                className="formItem"
              >
                <InputCustom
                  placeholder="Họ và tên"
                  type="text"
                  className="hover:border-primary focus:border-primary"
                />
              </Form.Item>
            </motion.div>
            <motion.div
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Form.Item
                name="phoneNumber"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số điện thoại",
                  },
                  {
                    pattern: /^[0-9]{10,11}$/,
                    message: "Vui lòng nhập đúng số điện thoại (10-11 chữ số)",
                  },
                ]}
                colon={true}
                labelCol={{ span: 24 }}
                className="formItem"
              >
                <InputCustom
                  placeholder="Số điện thoại"
                  type="text"
                  className="hover:border-primary focus:border-primary"
                />
              </Form.Item>
            </motion.div>

            <motion.div
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu",
                  },
                  {
                    min: 4,
                    max: 20,
                    message: "Mật khẩu phải có từ 4 đến 20 kí tự",
                  },
                ]}
                labelCol={{ span: 24 }}
                className="formItem"
                hasFeedback
              >
                <InputCustom
                  placeholder="Mật khẩu"
                  type="password"
                  className="hover:border-primary focus:border-primary"
                />
              </Form.Item>
            </motion.div>

            <motion.div
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu",
                  },
                  {
                    validator: validateFieldsMatch(
                      "newPassword",
                      "Mật khẩu xác nhận không trùng khớp",
                    ),
                  },
                ]}
                labelCol={{ span: 24 }}
                className="formItem"
                hasFeedback
              >
                <InputCustom
                  placeholder="Xác nhận mật khẩu"
                  type="password"
                  className="hover:border-primary focus:border-primary"
                />
              </Form.Item>
            </motion.div>

            <Form.Item name="" noStyle>
              <div className="mb-3 mt-8 flex w-full max-w-[300px] justify-start">
                <ReCAPTCHA
                  sitekey={recaptchaSiteKey}
                  onChange={onCaptchaChange}
                />
              </div>
            </Form.Item>
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
            >
              <Drawer open={isDrawerVisible} onClose={handleDrawerClose}>
                <DrawerTrigger asChild>
                  <Form.Item noStyle>
                    <ButtonCustom className="mx-auto flex h-11 w-full items-center rounded-[5px] bg-primary text-lg tracking-wider text-white hover:bg-primary/80">
                      {isSigningUp ? (
                        <Spin
                          indicator={
                            <LoadingOutlined className="text-[#fff]" />
                          }
                        />
                      ) : (
                        "Đăng ký"
                      )}
                    </ButtonCustom>
                  </Form.Item>
                </DrawerTrigger>

                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <motion.div
                      key="enterOTP"
                      initial={{ x: 0, opacity: 1 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -150, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <DrawerHeader>
                        <DrawerTitle className="text-2xl">
                          Nhập mã OTP
                        </DrawerTitle>
                        <DrawerDescription className="text-[#a3a1a1]">
                          Nhập mã OTP đã được gửi đến email của bạn
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="pb-0">
                        <div className="flex items-center justify-center space-x-2 px-5">
                          <InputOTP
                            maxLength={6}
                            className="px-5"
                            onChange={(value) => setOtp(value)}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </div>
                      <DrawerFooter>
                        <ButtonCustom
                          className="mx-auto flex h-11 w-full items-center rounded-[5px] bg-primary text-sm tracking-wider text-white hover:bg-primary/80"
                          onClick={handleOTPSubmit}
                        >
                          Xác nhận
                        </ButtonCustom>
                        <ButtonCustom
                          onClick={handleResendMail}
                          className="mx-auto block h-11 w-full rounded-[5px] border border-gray-300 bg-[#fff] shadow-none hover:!border-primary hover:!bg-transparent hover:!text-primary"
                        >
                          Gửi lại
                        </ButtonCustom>
                      </DrawerFooter>
                    </motion.div>
                  </div>
                </DrawerContent>
              </Drawer>
              <div className="mt-3 text-center text-sm">
                <span className="text-black">Bạn đã có tài khoản?</span>{" "}
                <a
                  href="#"
                  className="login-form-forgot group relative cursor-pointer font-semibold text-primary hover:text-primary"
                  onClick={() => setIsShowRegister(false)}
                >
                  Đăng nhập
                  <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </div>
            </motion.div>
          </Form>
        </section>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default React.memo(RegisterForm);
