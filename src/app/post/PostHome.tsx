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

const PostHome = () => {
  const { Meta } = Card;
  const { data, isLoading } = useGetPostListQuery({
    PageIndex: 1,
    PageSize: 100,
  });

  return (
    <section className="container mx-auto my-32 text-center">
      <div className="relative mt-20">
        <h3 className="text-center text-3xl font-bold text-primary lg:text-4xl">
          Tin tức
        </h3>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
          <div className="mt-2 flex w-[100px] items-center justify-center">
            <span className="h-px flex-grow bg-gray-300"></span>
            <span className="mx-2 text-gray-500">&#x2766;</span>
            <span className="h-px flex-grow bg-gray-300"></span>
          </div>
        </div>
      </div>

      <div className="my-10 flex justify-center">
        <Swiper
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            900: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            1150: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            1600: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            2000: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            2400: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            3300: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="mySwiper h-[450px] overflow-hidden transition-all duration-500"
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SwiperSlide
                  key={index}
                  className="flex h-[400px] w-[350px] justify-center"
                >
                  <div className="my-3 mr-4 rounded-lg border-[0.2px] border-[#e6e6e6] p-5">
                    <Skeleton active paragraph={{ rows: 3 }} />
                  </div>
                </SwiperSlide>
              ))
            : data?.length > 0 &&
              data.map((post: PostInfo, index: number) => (
                <SwiperSlide
                  key={index}
                  className="flex h-[400px] w-[350px] justify-center"
                >
                  <Link
                    href={`/post/${post?.id}`}
                    className="transition-all duration-500"
                  >
                    <Card
                      hoverable
                      className="mx-auto h-[400px] w-[350px] overflow-hidden border-2"
                      cover={
                        <Image
                          alt="error"
                          height={1000}
                          width={1000}
                          quality={100}
                          src={post.image}
                          className="h-[300px] w-full object-cover"
                        />
                      }
                    >
                      <Meta
                        description={
                          <>
                            <h2 className="block text-sm font-semibold text-[black]">
                              {post.title}
                            </h2>
                          </>
                        }
                      />
                    </Card>
                  </Link>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PostHome;
