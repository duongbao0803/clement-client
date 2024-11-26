import { BreadScrumb } from "@/components/common";
import Detail from "./Detail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fricks | Chi tiết sản phẩm",
  description:
    "Khám phá sản phẩm chất lượng cao với các thông tin chi tiết về vật liệu xây dựng trên Fricks. Đừng bỏ lỡ các ưu đãi và hướng dẫn sử dụng!",
  keywords: [
    "chi tiết sản phẩm",
    "vật liệu xây dựng",
    "Fricks",
    "hướng dẫn sử dụng",
    "ưu đãi",
    "sản phẩm chất lượng cao",
  ],
  openGraph: {
    title: "Fricks | Chi tiết sản phẩm",
    description:
      "Tìm hiểu về sản phẩm, tính năng và lợi ích của nó tại Fricks. Mua sắm thông minh với thông tin đầy đủ và chi tiết!",
    url: "https://www.frickshop.site/product/[productId]",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2Fproduct_image.png?alt=media",
        width: 1200,
        height: 630,
        alt: "Fricks | Chi tiết sản phẩm",
      },
    ],
  },
};

const ProductDetail = () => {
  const items = [
    {
      title: "Chi tiết sản phẩm",
    },
  ];
  return (
    <main className="min-h-screen">
      <section className="container mx-auto">
        <div className="my-10">
          <BreadScrumb items={items} />
        </div>
        <div className="my-5">
          <Detail />
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
