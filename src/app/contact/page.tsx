import React from "react";
import Map from "./Map";
import FormContact from "./FormContact";
import { BreadScrumb } from "@/components/common";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fricks | Liên hệ",
  description:
    "Liên hệ với Fricks để biết thêm chi tiết về sản phẩm và hỗ trợ khách hàng về các vật liệu xây dựng.",
  keywords: [
    "liên hệ",
    "Fricks",
    "hỗ trợ khách hàng",
    "vật liệu xây dựng",
    "thông tin liên hệ",
  ],
  openGraph: {
    title: "Fricks | Liên hệ",
    description:
      "Liên hệ với Fricks để được hỗ trợ về sản phẩm và dịch vụ liên quan đến vật liệu xây dựng.",
    url: "https://www.frickshop.site/contact",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2Fcontact_image.png?alt=media",
        width: 1200,
        height: 630,
        alt: "Fricks | Liên hệ",
      },
    ],
  },
};

const ContactPage = () => {
  const items = [
    {
      title: "Liên hệ",
    },
  ];
  return (
    <main className="container mx-auto min-h-screen px-4 py-12">
      <div className="mb-5">
        <BreadScrumb items={items} />
      </div>

      <Map />
      <FormContact />
    </main>
  );
};

export default ContactPage;
