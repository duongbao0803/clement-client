import { notify } from "@/components/common/Notification";
import { InputCustom } from "@/components/ui/input";
import { ADDRESS_OPTIONS } from "@/constants";
import { UserInfo } from "@/types/personal.types";
import { Col, Form, Modal, Row, Select } from "antd";
import React, { useEffect } from "react";

export interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  userInfo?: UserInfo;
}

const InfoModal: React.FC<AddModalProps> = (props) => {
  // const { addNewUserItem } = useUserService();
  const { setIsOpen, isOpen, userInfo } = props;
  const [form] = Form.useForm();
  const { Option } = Select;
  const userForm = sessionStorage.getItem("form");
  const data = userForm ? JSON.parse(userForm) : {};
  // const userForm = sessionStorage.getItem("form");
  // const data = JSON.parse(userForm ?? "");

  useEffect(() => {
    if (isOpen && userInfo) {
      form.setFieldsValue({
        email: data?.email || userInfo.email,
        fullName: data?.fullName || userInfo.fullName,
        customerAddress: data?.customerAddress || userInfo.address,
        customerPhone: data?.customerPhone || userInfo.phoneNumber,
      });
    }
  }, [isOpen, userInfo, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (values) {
        sessionStorage.setItem("form", JSON.stringify(values));
        notify("success", "Cập nhật thông tin thành công", 1);
        setIsOpen(false);
      }
    } catch (err) {
      setIsOpen(true);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Modal
      title={<p className="text-xl font-bold text-[red]">Thông tin liên hệ</p>}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Hủy"
      okButtonProps={{
        style: {
          backgroundColor: "#ff7b29",
          borderColor: "#ff7b29",
          color: "white",
          padding: "0 20px",
        },
      }}
    >
      <Form name="normal_login" className="login-form mt-5" form={form}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email",
            },
          ]}
          colon={true}
          labelCol={{ span: 24 }}
          className="formItem mb-7"
        >
          <InputCustom placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ và tên",
            },
          ]}
          colon={true}
          labelCol={{ span: 24 }}
          className="formItem mb-7"
        >
          <InputCustom placeholder="Họ và tên" />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại",
            },
            {
              min: 10,
              max: 10,
              message: "Số điện thoại phải có 10 số",
            },
          ]}
          colon={true}
          labelCol={{ span: 24 }}
          className="formItem mb-7"
        >
          <InputCustom placeholder="Số điện thoại" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="city"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tỉnh/thành phố",
                },
              ]}
              colon={true}
              labelCol={{ span: 24 }}
              className="formItem mb-7"
              initialValue={"TP. Hồ Chí Minh"}
            >
              <InputCustom placeholder="Thành phố" readOnly />
            </Form.Item>
            <Form.Item
              name="ward"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phường",
                },
              ]}
              colon={true}
              labelCol={{ span: 24 }}
              className="formItem h-[39.33px]"
            >
              <Select
                placeholder="Chọn phường"
                showSearch
                optionFilterProp="children"
                filterOption={filterOption}
                className="formItem h-[39.33px]"
              >
                {ADDRESS_OPTIONS.map((address, index) => (
                  <Option
                    key={index}
                    value={address?.label}
                    label={address?.label}
                  >
                    {address.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="district"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập quận/huyện",
                },
              ]}
              colon={true}
              labelCol={{ span: 24 }}
              className="formItem mb-7"
              initialValue={"TP. Thủ Đức"}
            >
              <InputCustom placeholder="Quận/huyện" readOnly />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ",
                },
              ]}
              colon={true}
              labelCol={{ span: 24 }}
              className="formItem h-[39.33px]"
            >
              <InputCustom placeholder="Địa chỉ" />
            </Form.Item>
          </Col>
        </Row>
        <i className="font-semibold text-[red]">
          *Lưu ý: Hiện tại, chúng tôi chỉ phục vụ trong phạm vi Thành Phố Thủ
          Đức. Rất mong quý khách bỏ qua sự bất tiện này. Shop xin chân thành
          cảm ơn.
        </i>
      </Form>
    </Modal>
  );
};

export default React.memo(InfoModal);
