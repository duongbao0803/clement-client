import React, { useState } from "react";
import { Form, Spin } from "antd";
import { motion } from "framer-motion";
import { LoadingOutlined } from "@ant-design/icons";
import { InputCustom } from "@/components/ui/input";
import RegisterForm from "@/app/auth/register/RegisterForm";
import { ButtonCustom } from "@/components/ui/button";
import { notify } from "@/components/common/Notification";
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
import {
  useConfirmNewPasswordMutation,
  useResetPasswordConfirmMutation,
  useResetPasswordMutation,
} from "@/apis/authApi";
import { isErrorResponse } from "@/utils";

interface IProps {
  isShowRegister: boolean;
  setIsShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPasswordForm: React.FC<IProps> = ({
  isShowRegister,
  setIsShowRegister,
}) => {
  const [isSending, setIsSending] = useState(false);
  const [form] = Form.useForm();
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const [isOTPSubmitted, setIsOTPSubmitted] = useState<boolean>(false);
  const [otpCode, setOtp] = useState<string>("");
  const [resetPassword] = useResetPasswordMutation();
  const [resetPasswordConfirm] = useResetPasswordConfirmMutation();
  const [confirmNewPassword] = useConfirmNewPasswordMutation();

  const validatePassword = (_: unknown, value: string) => {
    const password = form.getFieldValue("password");
    if (value && password && value !== password) {
      return Promise.reject("Mật khẩu không trùng");
    }
    return Promise.resolve();
  };

  const onFinish = async () => {
    setIsSending(true);
    setIsOTPSubmitted(false);
    const email = form.getFieldValue("email");
    try {
      const res = await resetPassword(JSON.stringify(email)).unwrap();
      if (res && res.httpCode === 200) {
        setIsSending(false);
        notify("success", `${res.message}`, 2);
        setTimeout(() => {
          setIsDrawerVisible(true);
        }, 1000);
      }
    } catch (err) {
      if (isErrorResponse(err)) {
        notify("error", `${err.data.message}`, 3);
        setIsSending(false);
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
      const res = await resetPasswordConfirm(information).unwrap();
      if (res && res.httpCode === 200) {
        setIsOTPSubmitted(true);
      }
    } catch (err) {
      if (isErrorResponse(err)) {
        notify("error", `${err.data.message}`, 3);
      } else {
        notify("error", `${err}`, 3);
      }
    }
  };

  const handleResetPassword = async () => {
    await form.validateFields();

    const email = form.getFieldValue("email");
    const password = form.getFieldValue("password");
    const information = { email, password };
    if (!email || !password) {
      notify("warning", "Vui lòng nhập đầy đủ thông tin", 2);
      return;
    }
    try {
      const res = await confirmNewPassword(information).unwrap();
      if (res && res.httpCode === 200) {
        notify("success", `${res.message}`, 2);
        setIsDrawerVisible(false);
        setIsShowRegister(true);
      }
    } catch (err) {
      if (isErrorResponse(err)) {
        notify("error", `${err.data.message}`, 3);
      } else {
        notify("error", `${err}`, 3);
      }
    }
  };

  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
    if (isOTPSubmitted) {
      setIsOTPSubmitted(false);
    }
  };

  return (
    <>
      {!isShowRegister ? (
        <section className="py-5">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="mb-5 text-center text-2xl font-bold uppercase text-primary transition-all duration-500 sm:text-3xl md:text-4xl">
              Quên mật khẩu
            </h1>
          </motion.div>
          <Form form={form} onFinish={onFinish} className="login-form">
            <motion.div
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email của bạn" },
                  { type: "email", message: "Vui lòng nhập đúng kiểu email" },
                ]}
              >
                <InputCustom
                  placeholder="Email"
                  className="hover:border-primary focus:border-primary"
                  autoFocus
                />
              </Form.Item>
            </motion.div>

            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
              className="mt-8"
            >
              <Drawer open={isDrawerVisible} onClose={handleDrawerClose}>
                <DrawerTrigger asChild>
                  <Form.Item name="" noStyle>
                    <ButtonCustom className="mx-auto flex h-11 w-full items-center rounded-[5px] bg-primary text-lg tracking-wider text-white hover:bg-primary/80">
                      {isSending ? (
                        <Spin
                          indicator={
                            <LoadingOutlined className="text-[#fff]" />
                          }
                        />
                      ) : (
                        "Gửi"
                      )}
                    </ButtonCustom>
                  </Form.Item>
                </DrawerTrigger>

                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    {!isOTPSubmitted ? (
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
                            Nhập mã OTP đã gửi đến email của bạn.
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
                            Khôi phục
                          </ButtonCustom>
                        </DrawerFooter>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="resetPassword"
                        initial={{ x: 150, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 150, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <DrawerHeader>
                          <DrawerTitle className="text-2xl">
                            Đặt lại mật khẩu
                          </DrawerTitle>
                          <DrawerDescription className="text-[#a3a1a1]">
                            Nhập mật khẩu mới và xác nhận lại.
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="pb-0">
                          <div className="px-5">
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
                                  message: "Mật khẩu phải có ít nhất 8 kí tự",
                                },
                              ]}
                              className="mb-7"
                            >
                              <InputCustom
                                type="password"
                                placeholder="Mật khẩu"
                                className="w-full hover:border-primary focus:border-primary"
                                autoFocus
                              />
                            </Form.Item>
                            <Form.Item
                              name="confirmPassword"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng xác nhận mật khẩu",
                                },
                                { validator: validatePassword },
                              ]}
                            >
                              <InputCustom
                                placeholder="Xác nhận mật khẩu"
                                type="password"
                                className="hover:border-primary focus:border-primary"
                              />
                            </Form.Item>
                          </div>
                        </div>
                        <DrawerFooter>
                          <ButtonCustom
                            className="mx-auto flex h-11 w-full items-center rounded-[5px] bg-primary text-sm tracking-wider text-white hover:bg-primary/80"
                            onClick={handleResetPassword}
                          >
                            Xác nhận
                          </ButtonCustom>
                        </DrawerFooter>
                      </motion.div>
                    )}
                  </div>
                </DrawerContent>
              </Drawer>

              <div className="mt-3 text-center text-sm">
                <span className="text-black">Bạn đã có tài khoản?</span>{" "}
                <a
                  href="#"
                  className="login-form-forgot group relative cursor-pointer font-semibold text-primary hover:text-primary"
                  onClick={() => setIsShowRegister(true)}
                >
                  Đăng nhập
                  <span className="absolute bottom-[-3px] left-0 h-0.5 w-full scale-x-0 transform bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </div>
            </motion.div>
          </Form>
        </section>
      ) : (
        <RegisterForm
          isShowRegister={false}
          setIsShowRegister={setIsShowRegister}
        />
      )}
    </>
  );
};

export default ForgotPasswordForm;
