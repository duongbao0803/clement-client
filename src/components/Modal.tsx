"use client";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { ButtonCustom } from "./ui/button";

const ModalCustom: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Modal
      title={<p className="text-xl font-bold text-[red]">Thông báo</p>}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      okText="Xác nhận"
      cancelText="Hủy"
      footer={null}
      centered
      okButtonProps={{
        style: {
          backgroundColor: "#ff7b29",
          borderColor: "#ff7b29",
          color: "white",
          padding: "0 20px",
        },
      }}
    >
      <i className="font-semibold">
        <p className="mb-3">
          Đây là dự án của sinh viên trường Đại học FPT TP.HCM, được thực hiện
          với mục đích phục vụ cộng đồng và học hỏi kinh nghiệm thực tế.
        </p>
        <p className="mb-3">
          Vì lý do đó, dự án hiện chỉ phục vụ cho khách hàng ở khu vực Thành phố
          Thủ Đức, TP.HCM. Chúng tôi mong nhận được sự ủng hộ và phản hồi từ quý
          khách hàng tại khu vực này để dự án có thể phát triển và hoàn thiện
          hơn.
        </p>
        <p>Xin cảm ơn!</p>
      </i>
      <div className="mt-5 flex justify-center text-[white]">
        <ButtonCustom onClick={() => setIsOpen(false)}>Bỏ qua</ButtonCustom>
      </div>
    </Modal>
  );
};

export default React.memo(ModalCustom);
