import { BannerCustom, BreadScrumb } from "@/components/common";
import React from "react";
import OrderDetail from "./OrderDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fricks | Thanh toán",
  description:
    "Hoàn tất quá trình thanh toán cho đơn hàng của bạn tại Frickshop. Thanh toán an toàn và nhanh chóng cho các sản phẩm vật liệu xây dựng.",
  keywords: [
    "thanh toán",
    "giỏ hàng",
    "mua sắm",
    "vật liệu xây dựng",
    "Frickshop",
  ],
  openGraph: {
    title: "Fricks | Thanh toán",
    description:
      "Thanh toán đơn hàng của bạn trên Frickshop một cách an toàn và nhanh chóng.",
    url: "https://www.frickshop.site/checkout",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2Fcheckout_image.png?alt=media",
        width: 1200,
        height: 630,
        alt: "Frickshop - Thanh toán",
      },
    ],
  },
};

const CheckoutPage = () => {
  const items = [
    {
      href: "/product",
      title: "Sản phẩm",
    },
    {
      href: "/cart",
      title: "Giỏ hàng",
    },
    {
      title: "Thanh toán",
    },
  ];
  return (
    <main className="min-h-screen bg-[#f4f4f48e]">
      <BannerCustom title="Thanh toán" />
      <div className="container mx-auto">
        <div className="my-10">
          <BreadScrumb items={items} />
        </div>
        <OrderDetail />
      </div>
    </main>
  );
};

export default CheckoutPage;
