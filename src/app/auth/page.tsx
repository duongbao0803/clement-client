import { Metadata } from "next";
import LoginForm from "./login/LoginForm";
import { Carousel } from "@/components";

export const metadata: Metadata = {
  title: "Fricks | Xác thực",
  description:
    "Đăng nhập hoặc đăng ký tài khoản để mua sắm các sản phẩm vật liệu xây dựng chất lượng cao tại Fricks.",
  keywords: [
    "đăng nhập",
    "đăng ký",
    "tài khoản",
    "Fricks",
    "vật liệu xây dựng",
  ],
  openGraph: {
    title: "Fricks | Xác thực",
    description:
      "Truy cập tài khoản Fricks để xem đơn hàng và mua sắm dễ dàng các sản phẩm vật liệu xây dựng.",
    url: "https://www.frickshop.site/auth",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2Fauth_image.png?alt=media",
        width: 1200,
        height: 630,
        alt: "Fricks | Xác thực",
      },
    ],
  },
};

const AuthPage = () => {
  return (
    <>
      <main className="flex flex-grow bg-[hsl(0,0%,97%)]">
        <section className="container mx-auto grid h-screen flex-grow flex-row place-items-center bg-[hsl(0,0%,97%)]">
          <div className="mx-5 my-2 grid min-h-[400px] w-full max-w-[450px] grid-cols-1 overflow-hidden rounded-[30px] border-none bg-[#fff] transition-all duration-500 sm:min-w-[450px] sm:max-w-[500px] sm:border lg:grid lg:min-h-[650px] lg:max-w-[1024px] lg:grid-cols-2 lg:shadow-2xl">
            <div className="order-2 my-auto items-center overflow-hidden px-7 lg:px-16">
              <LoginForm />
            </div>
            <div className="order-1 hidden rounded-xl transition-all duration-500 lg:block">
              <Carousel />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AuthPage;
