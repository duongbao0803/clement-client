import { Metadata } from "next";
import OrderedList from "./OrderList";

// export const metadata: Metadata = {
//   title: "Fricks | Lịch sử đơn hàng",
//   description:
//     "Xem lại lịch sử đơn hàng của bạn trên Fricks và theo dõi trạng thái các đơn hàng đã đặt.",
//   keywords: [
//     "lịch sử đơn hàng",
//     "theo dõi đơn hàng",
//     "giao dịch",
//     "trạng thái đơn hàng",
//     "Fricks",
//     "đơn hàng",
//   ],
//   openGraph: {
//     title: "Fricks | Lịch sử đơn hàng",
//     description:
//       "Theo dõi và quản lý đơn hàng của bạn, xem chi tiết các sản phẩm đã mua trên Fricks.",
//     url: "https://www.frickshop.site/user/ordered",
//     images: [
//       {
//         url: "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2Fordered_image.png?alt=media",
//         width: 1200,
//         height: 630,
//         alt: "Fricks | Lịch sử đơn hàng",
//       },
//     ],
//   },
// };

const OrderedPage = () => {
  return <OrderedList />;
};

export default OrderedPage;
