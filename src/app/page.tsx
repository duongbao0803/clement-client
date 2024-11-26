import {
  CarouselHome,
  IntroHome,
  ScrollReveal,
  Statistical,
  Subscribe,
} from "@/components";
import Modal from "@/components/Modal";
import { Metadata } from "next";
import "./globals.css";
import PostHome from "./post/PostHome";
import ProductHome from "./product/ProductHome";

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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Modal />
      <CarouselHome />
      <ProductHome />
      <ScrollReveal>
        <IntroHome />
      </ScrollReveal>
      <ScrollReveal>
        <Statistical />
      </ScrollReveal>
      <ScrollReveal>
        <PostHome />
      </ScrollReveal>
      <ScrollReveal>
        <Subscribe />
      </ScrollReveal>
    </main>
  );
}
