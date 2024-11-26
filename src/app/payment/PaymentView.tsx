"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useGetOrderStatusQuery } from "@/apis/orderApi";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/slices/cartSlice";
import { setOrderInfo } from "@/redux/slices/orderSlice";
import { Spin } from "antd";

const PaymentView: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [id, setId] = useState<number>(0);
  const { data: orderInfo, isLoading } = useGetOrderStatusQuery({
    orderId: id,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const status = searchParams.get("status");
    const orderId = searchParams.get("order");

    if (orderId) {
      setId(Number(orderId));
    }

    if (orderInfo && !isLoading) {
      dispatch(setOrderInfo(orderInfo));

      if (status === "paid") {
        dispatch(clearCart());
        router.replace("/payment/success");
        sessionStorage.removeItem("form");
      } else {
        router.replace("/payment/failure");
      }
    }
  }, [searchParams, router, orderInfo, isLoading, dispatch]);

  return (
    <section className="h-screen">
      <Spin fullscreen tip="Đang chờ..." />
    </section>
  );
};

export default PaymentView;
