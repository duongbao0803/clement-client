import { Metadata } from "next";
import PaymentView from "./PaymentView";

// export const metadata: Metadata = {
//   title: "Fricks | Thanh toán",
//   description:
//     "Hoàn tất thanh toán an toàn và nhanh chóng cho đơn hàng của bạn tại Fricks. Chúng tôi hỗ trợ nhiều phương thức thanh toán tiện lợi.",
//   keywords: [
//     "thanh toán",
//     "phương thức thanh toán",
//     "an toàn",
//     "Fricks",
//     "vật liệu xây dựng",
//   ],
//   openGraph: {
//     title: "Fricks | Thanh toán",
//     description:
//       "Thanh toán đơn hàng của bạn tại Fricks dễ dàng và an toàn với nhiều lựa chọn phương thức thanh toán phù hợp.",
//     url: "https://www.frickshop.site/payment",
//     images: [
//       {
//         url: "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2Fpayment_image.png?alt=media",
//         width: 1200,
//         height: 630,
//         alt: "Fricks | Thanh toán",
//       },
//     ],
//   },
// };

const PaymentPage: React.FC = () => {
  return <PaymentView />;
};

export default PaymentPage;
