"use client";
import { Form } from "antd";
import { UploadImage } from "@/components/common";

const AvatarUpload = ({ userInfo, handleFileChange }: any) => {
  return (
    <Form.Item
      name="avatar"
      rules={[{ required: true, message: "Vui lòng chọn hình ảnh" }]}
      className="flex w-full items-center justify-center"
    >
      <div className="flex w-full flex-col items-center">
        <UploadImage
          titleButton="Thêm ảnh"
          initialImage={userInfo?.avatar ?? ""}
          onFileChange={handleFileChange}
        />
      </div>
    </Form.Item>
  );
};

export default AvatarUpload;
