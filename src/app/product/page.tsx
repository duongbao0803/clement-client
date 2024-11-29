import { BannerCustom, BreadScrumb } from "@/components/common";
import ProductList from "./ProductList";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Fricks | Sản phẩm",
//   description:
//     "Khám phá các sản phẩm vật liệu xây dựng chất lượng cao tại Fricks. Chúng tôi cung cấp sắt thép, xi măng, gạch, và nhiều sản phẩm khác cho mọi công trình.",
//   keywords: [
//     "vật liệu xây dựng",
//     "sản phẩm",
//     "sắt thép",
//     "xi măng",
//     "gạch",
//     "Fricks",
//   ],
//   openGraph: {
//     title: "Fricks | Sản phẩm",
//     description:
//       "Xem các sản phẩm vật liệu xây dựng đa dạng cho mọi công trình tại Fricks. Đảm bảo chất lượng và giá cả hợp lý.",
//     url: "https://www.frickshop.site/product",
//     images: [
//       {
//         url: "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2Fproduct_image.png?alt=media",
//         width: 1200,
//         height: 630,
//         alt: "Fricks | Sản phẩm",
//       },
//     ],
//   },
// };

const ProductPage = () => {
  const items = [
    {
      title: "Sản phẩm",
    },
  ];

  return (
    <main className="min-h-screen">
      <BannerCustom title="Danh sách sản phẩm" />
      <section className="container mx-auto">
        <div className="my-10">
          <BreadScrumb items={items} />
        </div>
        <div className="my-16">
          <ProductList />
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
