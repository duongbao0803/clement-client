"use client";
import { useGetListOrderQuery, useGetOrderStatusQuery } from "@/apis/orderApi";
import NotFoundImage from "@/assets/images/logo/no-products.png";
import { PAYMENT_STATUS } from "@/enums";
import { OrderInfo } from "@/types/order.types";
import { Modal, Spin } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import OrderedBill from "./OrderedBill";
import OrderItem from "./OrderItem";
import TransactionTabs from "./TransactionTabs";

const OrderedList: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: listOrder = [], isFetching } = useGetListOrderQuery({
    PageIndex: 1,
    PageSize: 50,
  });
  const orderId = JSON.parse(sessionStorage.getItem("orderId") as string);
  const { data: orderInfo } = useGetOrderStatusQuery({
    orderId: orderId,
  });

  useEffect(() => {
    if (!isFetching) {
      setLoading(false);
    }
  }, [isFetching]);

  const showLoading = (id: number) => {
    sessionStorage.setItem("orderId", JSON.stringify(id));
    setOpen(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleButtonClick = (index: number) => {
    setIsLoading(true);
    setActiveIndex(index);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [activeIndex]);

  const filteredOrders = listOrder.filter((order: OrderInfo) => {
    if (activeIndex === 1)
      return order.paymentStatus.includes(PAYMENT_STATUS.PAID);
    if (activeIndex === 2)
      return order.paymentStatus.includes(PAYMENT_STATUS.FAILED);
    if (activeIndex === 3)
      return order.paymentStatus.includes(PAYMENT_STATUS.PENDING);
    return true;
  });

  const renderComponent = () => {
    if (loading) {
      return (
        <div className="flex justify-center">
          <Spin size="large" tip="Đang tải dữ liệu..." className="text-[red]" />
        </div>
      );
    }

    return (
      <>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order: OrderInfo, index: React.Key) => (
            <OrderItem key={index} order={order} showLoading={showLoading} />
          ))
        ) : (
          <div className="flex justify-center">
            <Image
              src={NotFoundImage}
              alt="No orders available"
              width={450}
              height={450}
              quality={100}
            />
          </div>
        )}
      </>
    );
  };

  return (
    <section>
      <h1 className="mb-2">Giao dịch</h1>
      <TransactionTabs
        activeIndex={activeIndex}
        handleButtonClick={handleButtonClick}
      />
      {renderComponent()}
      <Modal
        width={1000}
        height={600}
        footer={null}
        open={open}
        onCancel={() => setOpen(false)}
        styles={{
          body: {
            maxHeight: "80vh",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          },
        }}
      >
        {isLoading ? (
          <Spin
            size="large"
            tip="Đang chờ..."
            className="flex justify-center"
          />
        ) : (
          <OrderedBill orderInfo={orderInfo} />
        )}
      </Modal>
    </section>
  );
};

export default OrderedList;
