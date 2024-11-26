import { NextProgressBar } from "@/components";
import LoadingWrapper from "@/components/LoadingWrapper";
import { NotificationProvider } from "@/components/common/Notification";
import { Providers } from "@/redux/provider";
import { Roboto_Slab } from "next/font/google";
import Script from "next/script";
import ClientLayout from "./auth/layout";
import "./globals.css";
import { Metadata } from "next";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-robotoSlab",
});

export const metadata: Metadata = {
  title: "Fricks | Trang chủ",
  description:
    "Fricks chuyên cung cấp các sản phẩm liên quan đến vật liệu xây dựng và công trình với chất lượng cao và giá cả hợp lý.",
  keywords: [
    "vật liệu xây dựng",
    "công trình",
    "sắt thép",
    "xi măng",
    "gạch",
    "Fricks",
  ],
  openGraph: {
    title: "Fricks | Trang chủ",
    description:
      "Tìm mua các vật liệu xây dựng tốt nhất cho công trình của bạn tại Fricks. Chúng tôi cung cấp đầy đủ các loại sản phẩm từ gạch, xi măng, sắt thép và nhiều hơn nữa.",
    url: "https://www.frickshop.site/",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2Flogo_web.png?alt=media&token=65731b70-968e-444b-8319-f279217d02ee",
        width: 1200,
        height: 630,
        alt: "Fricks | Trang chủ",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoSlab.variable}`}>
        <LoadingWrapper>
          <NotificationProvider>
            <NextProgressBar />
            <Providers>
              <ClientLayout>{children}</ClientLayout>
            </Providers>
          </NotificationProvider>
        </LoadingWrapper>

        <Script id="subiz-script" strategy="lazyOnload">
          {`(function(s,u,b,i,z){var o,t,r,y;s[i]||(s._sbzaccid=z,s[i]=function(){s[i].q.push(arguments)},s[i].q=[],s[i]("setAccount",z),r=["widget.subiz.net","storage.googleapis"+(t=".com"),"app.sbz.workers.dev",i+"a"+(o=function(k,t){var n=t<=6?5:o(k,t-1)+o(k,t-3);return k!==t?n:n.toString(32)})(20,20)+t,i+"b"+o(30,30)+t,i+"c"+o(40,40)+t],(y=function(k){var t,n;s._subiz_init_2094850928430||r[k]&&(t=u.createElement(b),n=u.getElementsByTagName(b)[0],t.async=1,t.src="https://"+r[k]+"/sbz/app.js?accid="+z,n.parentNode.insertBefore(t,n),setTimeout(y,2e3,k+1))})(0))})(window,document,"script","subiz", "acscryxkbryqwcqqwrkv");`}
        </Script>
      </body>
    </html>
  );
}
