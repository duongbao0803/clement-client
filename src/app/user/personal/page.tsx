import { Metadata } from "next";
import Personal from "./Personal";

// export const metadata: Metadata = {
//   title: "Fricks | Thông tin cá nhân",
//   description:
//     "Cập nhật và quản lý thông tin cá nhân của bạn trên Fricks, bao gồm họ tên, địa chỉ, số điện thoại và nhiều thông tin khác.",
//   keywords: [
//     "thông tin cá nhân",
//     "quản lý tài khoản",
//     "email",
//     "ngày sinh",
//     "giới tính",
//     "số điện thoại",
//     "họ và tên",
//     "địa chỉ",
//     "Fricks",
//   ],
//   openGraph: {
//     title: "Fricks | Thông tin cá nhân",
//     description:
//       "Cập nhật và quản lý chi tiết thông tin cá nhân của bạn trên Fricks để tiện lợi trong việc mua sắm.",
//     url: "https://www.frickshop.site/user/personal",
//     images: [
//       {
//         url: "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2Fpersonal_image.png?alt=media",
//         width: 1200,
//         height: 630,
//         alt: "Fricks | Thông tin cá nhân",
//       },
//     ],
//   },
// };

const PersonalPage = () => {
  return (
    <main>
      <Personal />
    </main>
  );
};

export default PersonalPage;
