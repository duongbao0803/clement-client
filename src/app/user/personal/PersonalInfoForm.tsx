"use client";
import { GENDER } from "@/enums";
import { DatePicker, Form, Input, Select } from "antd";
import moment from "moment";

const PersonalInfoForm = ({ form, userInfo }: any) => {
  const disabledDate = (current: object) =>
    current && current > moment().startOf("day");

  return (
    <table className="h-full w-full">
      <tbody>
        <tr>
          <td className="w-[30%] align-baseline">
            <p>
              <span className="text-lg text-[red]">*</span> Email:
            </p>
          </td>
          <td className="w-[70%] align-baseline">
            <Form.Item name="email" className="formItem">
              <Input placeholder="Nhập email" readOnly className="p-2" />
            </Form.Item>
          </td>
        </tr>
        <tr>
          <td className="w-[30%] align-baseline">
            <p>
              <span className="text-lg text-[red]">*</span> Họ và tên:
            </p>
          </td>
          <td className="w-[70%] align-baseline">
            <Form.Item
              name="fullName"
              hasFeedback
              rules={[
                { required: true, message: "Vui lòng nhập họ và tên" },
                { min: 8, message: "Tên người dùng ít nhất 8 ký tự" },
              ]}
              className="formItem"
            >
              <Input placeholder="Nhập họ và tên" className="p-2" allowClear />
            </Form.Item>
          </td>
        </tr>
        <tr>
          <td className="w-[30%] align-baseline">
            <p>
              <span className="text-lg text-[red]">*</span> Ngày sinh:
            </p>
          </td>
          <td className="w-[70%] align-baseline">
            <Form.Item
              name="dob"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày tháng năm sinh",
                },
              ]}
              className="formItem"
            >
              <DatePicker
                picker="date"
                placeholder="Chọn ngày sinh"
                className="w-full p-2"
                disabledDate={disabledDate}
                format="DD/MM/YYYY"
                allowClear
              />
            </Form.Item>
          </td>
        </tr>
        <tr>
          <td className="w-[30%] align-baseline">
            <p>
              <span className="text-lg text-[red]">*</span> Giới tính:
            </p>
          </td>
          <td className="w-[70%] align-baseline">
            <Form.Item
              name="gender"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              className="formItem"
            >
              <Select placeholder="Chọn giới tính" className="h-[39.33px]">
                <Select.Option value={GENDER.MALE}>Nam</Select.Option>
                <Select.Option value={GENDER.FEMALE}>Nữ</Select.Option>
                <Select.Option value={GENDER.OTHER}>Khác</Select.Option>
              </Select>
            </Form.Item>
          </td>
        </tr>
        <tr>
          <td className="w-[30%] align-baseline">
            <p>
              <span className="text-lg text-[red]">*</span> Số điện thoại:
            </p>
          </td>
          <td className="w-[70%] align-baseline">
            <Form.Item
              name="phoneNumber"
              hasFeedback
              className="formItem"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Vui lòng nhập đúng số điện thoại (10 chữ số)",
                },
              ]}
            >
              <Input
                placeholder="Nhập số điện thoại"
                className="p-2"
                allowClear
              />
            </Form.Item>
          </td>
        </tr>
        <tr>
          <td className="w-[30%] align-baseline">
            <p>
              <span className="text-lg text-[red]">*</span> Địa chỉ:
            </p>
          </td>
          <td className="w-[70%] align-baseline">
            <Form.Item
              name="address"
              hasFeedback
              className="formItem"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
            >
              <Input placeholder="Nhập địa chỉ" className="p-2" allowClear />
            </Form.Item>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PersonalInfoForm;
