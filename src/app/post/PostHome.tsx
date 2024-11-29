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
                "https://media.discordapp.net/attachments/1084829266581147658/1312094364805234838/588a7ec1-3637-4051-aee1-1dcd76dc145b.jpg?ex=674b3e9a&is=6749ed1a&hm=1f0e970a72211cafa12e6ae643fe6397c7d822750d7c37184b83cb823b3f9142&=&format=webp&width=732&height=488"
              }
              className="h-[400px] w-full rounded-md object-cover"
              alt="main product"
            />
          </section>
          <section className="col-span-2 justify-start">
            <div className="flex flex-col gap-5">
              <div className="pt-5 leading-5">
                <p className="text-3xl font-semibold uppercase text-primary">
                  Màng bọc thực phẩm Chitosan
                </p>
                <p className="text-lg">100cm x 30cm hoặc 500cm x 30cm</p>
              </div>
              <p>
                <span className="font-semibold text-primary">
                  Màng Bọc Thực Phẩm Chitosan
                </span>{" "}
                là sản phẩm giúp bảo quản thực phẩm có thể được sử dụng linh
                hoạt với mọi hình dáng, kích thước của vật cần bảo quản. Nó tạo
                ra một màng mỏng cách ly sự tiếp xúc giữa thực phẩm với bụi,
                nước - tác nhân gây giảm thời hạn sử dụng của thực phẩm. Ngoài
                ra, màng bọc bảo quản thức ăn làm từ nhiên liệu với{" "}
                <span className="font-semibold text-primary">
                  KHẢ NĂNG PHÂN HỦY
                </span>{" "}
                của Chitosan hiệu quả gấp 2 - 3 lần màng bọc thực phẩm bình
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
