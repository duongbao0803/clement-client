import { BannerCustom, BreadScrumb } from "@/components/common";
import React from "react";
import OrderTable from "./OrderTable";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Fricks | Giỏ hàng",
//   description:
//     "Xem giỏ hàng của bạn với đầy đủ sản phẩm và giá trị đơn hàng trên Fricks.",
//   keywords: [
//     "giỏ hàng",
//     "mua sắm",
//     "vật liệu xây dựng",
//     "Fricks",
//     "sắt thép",
//     "xi măng",
//     "gạch",
//   ],
//   openGraph: {
//     title: "Fricks | Giỏ hàng",
//     description:
//       "Kiểm tra giỏ hàng của bạn trên Fricks và hoàn tất quá trình thanh toán cho các sản phẩm vật liệu xây dựng.",
//     url: "https://www.frickshop.site/cart",
//     images: [
//       {
//         url: "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2Fcart_image.png?alt=media",
//         width: 1200,
//         height: 630,
//         alt: "Fricks | Giỏ hàng",
//       },
//     ],
//   },
// };

const CartPage = () => {
  const items = [
    {
      href: "/product",
      title: "Sản phẩm",
    },
    {
      title: "Giỏ hàng",
    },
  ];
  return (
    <main className="min-h-screen">
      <BannerCustom title="Giỏ hàng" />
      <div className="container mx-auto">
        <div className="my-10">
          <BreadScrumb items={items} />
        </div>
        <OrderTable />
      </div>
    </main>
  );
};

export default CartPage;
