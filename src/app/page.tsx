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
  title: "Green Future | Trang chủ",
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
