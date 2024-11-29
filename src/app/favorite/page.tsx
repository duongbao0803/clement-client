import { BannerCustom, BreadScrumb } from "@/components/common";
import FavoriteTable from "./FavoriteTable";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Fricks | Yêu thích",
//   description:
//     "Xem danh sách các sản phẩm yêu thích của bạn trên Fricks để dễ dàng theo dõi và mua sắm các vật liệu xây dựng.",
//   keywords: ["yêu thích", "sản phẩm yêu thích", "Fricks", "vật liệu xây dựng"],
//   openGraph: {
//     title: "Fricks | Yêu thích",
//     description:
//       "Quản lý danh sách sản phẩm yêu thích và mua sắm dễ dàng các vật liệu xây dựng tại Fricks.",
//     url: "https://www.frickshop.site/favorite",
//     images: [
//       {
//         url: "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2Ffavorite_image.png?alt=media",
//         width: 1200,
//         height: 630,
//         alt: "Fricks | Yêu thích",
//       },
//     ],
//   },
// };

const ContactPage = () => {
  const items = [
    {
      title: "Danh sách yêu thích",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fff]">
      <BannerCustom title="Danh sách yêu thích" />
      <div className="container mx-auto my-5">
        <div className="my-10">
          <BreadScrumb items={items} />
        </div>
        <div>
          <FavoriteTable />
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
