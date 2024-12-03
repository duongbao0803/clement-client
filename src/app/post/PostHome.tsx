"use client";
import { Card, Skeleton } from "antd";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import { useGetPostListQuery } from "@/apis/postApi";
import { PostInfo } from "@/types/post.types";
import { ButtonCustom } from "@/components/ui/button";
import mainProduct from "@/assets/images/products/main-product.png";

const PostHome = () => {
  const { Meta } = Card;
  const { data, isLoading } = useGetPostListQuery({
    PageIndex: 1,
    PageSize: 100,
  });

  return (
    <section className="container mx-auto my-32">
      <section className="relative mt-20">
        <section className="relative grid grid-cols-3 gap-7">
          <section className="col-span-1">
            <Image
              height={3000}
              width={3000}
              quality={100}
              src={
                "https://firebasestorage.googleapis.com/v0/b/exe201-9459a.appspot.com/o/Fricks%2Fmain-product.jpg?alt=media&token=51e551e3-5dcd-4f32-a818-afa81e96bb1a"
              }
              className="h-[400px] w-full rounded-md object-cover"
              alt="main product"
            />
          </section>
          <section className="col-span-2 justify-start">
            <div className="flex flex-col gap-5">
              <div className="pt-5 leading-5">
                <p className="text-3xl font-semibold uppercase text-primary">
                  Màng bọc thực phẩm Agar & Tinh bột bắp
                </p>
                <p className="text-lg">100cm x 30cm hoặc 500cm x 30cm</p>
              </div>
              <p>
                <span className="font-semibold text-primary">
                  Màng bọc thực phẩm Agar & Tinh bột bắp
                </span>{" "}
                là sản phẩm giúp bảo quản thực phẩm có thể được sử dụng linh
                hoạt với mọi hình dáng, kích thước của vật cần bảo quản. Nó tạo
                ra một màng mỏng cách ly sự tiếp xúc giữa thực phẩm với bụi,
                nước - tác nhân gây giảm thời hạn sử dụng của thực phẩm. Ngoài
                ra, màng bọc bảo quản thức ăn làm từ nhiên liệu với{" "}
                <span className="font-semibold text-primary">
                  KHẢ NĂNG PHÂN HỦY
                </span>{" "}
                của Agar & Tinh bột bắp hiệu quả gấp 2 - 3 lần màng bọc thực phẩm bình
                thường
              </p>
            </div>
          </section>
          <div className="absolute bottom-5 right-0">
            <button
              type="submit"
              className="button-hire__custom !w-56 rounded-md border border-primary border-transparent !py-4 text-lg font-normal uppercase hover:border hover:font-bold hover:text-primary"
            >
              Trải nghiệm ngay
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </section>
      </section>
    </section>
  );
};

export default PostHome;
