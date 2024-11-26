"use client";
import { useChangePasswordMutation } from "@/apis/authApi";
import { notify } from "@/components/common/Notification";
import { ButtonCustom } from "@/components/ui/button";
import { useValidateFieldsMatch } from "@/hooks/useValidateFieldMatch";
import { Form, Input } from "antd";

const ChangePasswordForm = () => {
  const [form] = Form.useForm();
  const { validateFieldsMatch } = useValidateFieldsMatch(form);
  const [changePassword] = useChangePasswordMutation();

  const onFinish = async (values: any) => {
    try {
      const res = await changePassword(values).unwrap();
      if (res && res.httpCode == 200) {
        notify("success", `${res.message}`, 2);
        form.resetFields();
      }
    } catch (err: any) {
      notify("error", `${err.data.message}`, 3);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <table className="h-full w-full">
        <tbody>
          <tr>
            <td className="w-[20%] align-baseline">
              <p>
                <span className="text-lg text-[red]">*</span> Mật khẩu cũ:
              </p>
            </td>
            <td className="w-[80%] align-baseline">
              <Form.Item
                name="oldPassword"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu cũ",
                  },
                ]}
                className="formItem"
              >
                <Input
                  type="password"
                  placeholder="Mật khẩu cũ"
                  className="w-[90%] max-w-[400px] p-2"
                />
              </Form.Item>
            </td>
          </tr>
          <tr>
            <td className="w-[20%] align-baseline">
              <p>
                <span className="text-lg text-[red]">*</span> Mật khẩu mới:
              </p>
            </td>
            <td className="w-[80%] align-baseline">
              <Form.Item
                name="newPassword"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu mới",
                  },
                ]}
                className="formItem"
              >
                <Input
                  type="password"
                  placeholder="Mật khẩu mới"
                  className="w-[90%] max-w-[400px] p-2"
                  allowClear
                />
              </Form.Item>
            </td>
          </tr>
          <tr>
            <td className="w-[20%] align-baseline">
              <p>
                <span className="text-lg text-[red]">*</span> Xác nhận mật khẩu:
              </p>
            </td>
            <td className="w-[80%] align-baseline">
              <Form.Item
                name="confirmPassword"
                hasFeedback
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
                className="formItem"
              >
                <Input
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  className="w-[90%] max-w-[400px] p-2"
                  allowClear
                />
              </Form.Item>
            </td>
          </tr>
          <tr>
            <td className="w-[20%] align-baseline"></td>
            <td className="w-[80%] align-baseline">
              <ButtonCustom className="mt-4 w-36 text-white">
                Cập nhật
              </ButtonCustom>
            </td>
          </tr>
        </tbody>
      </table>
    </Form>
  );
};

export default ChangePasswordForm;
