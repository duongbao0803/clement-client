"use client";
import { useGetListBannerQuery } from "@/apis/bannerApi";
import { Carousel } from "antd";
import React from "react";
import { BiSupport } from "react-icons/bi";
import { CiCoinInsert } from "react-icons/ci";
import { LiaShippingFastSolid } from "react-icons/lia";
import ImageSliderCustom from "./common/ImageSliderCustom";

const CarouselHome = () => {
  const { data: banner } = useGetListBannerQuery({});

  const Process = [
    {
      icon: (
        <LiaShippingFastSolid className="size-12 rounded-full border border-[#fff] p-3 text-[#fff] md:size-14 lg:size-16" />
      ),
      name: "Miễn phí vận chuyển",
      title: "Cho bất kì đơn hàng",
    },
    {
      icon: (
        <CiCoinInsert className="size-12 rounded-full border border-[#fff] p-3 text-[#fff] md:size-14 lg:size-16" />
      ),
      name: "Tiết kiệm chi phí",
      title: "Cam kết giá ổn nhất thị trường",
    },
    {
      icon: (
        <BiSupport className="size-12 rounded-full border border-[#fff] p-3 text-[#fff] md:size-14 lg:size-16" />
      ),
      name: "Hỗ trợ kỹ thuật",
      title: "Chăm sóc khách hàng tận tình",
    },
  ];

  return (
    <section>
      <div className="relative max-h-[600px] w-full transition-all duration-500">
        {banner && banner.length > 0 ? (
          <Carousel
            autoplay
            className="select-none rounded-lg transition-all duration-500"
          >
            {banner.map((item: any, index: React.Key | null | undefined) => (
              <ImageSliderCustom
                key={index}
                src={item?.image}
                alt="slide"
                width={1000}
                height={1000}
                quality={100}
                className="max-h-[600px] w-full max-w-full transition-all duration-500"
              />
            ))}
          </Carousel>
        ) : (
          <div className="flex h-[600px] w-full max-w-full items-center justify-center rounded-lg bg-orange-200">
            <p className="text-xl text-gray-500">Đang chờ...</p>
          </div>
        )}
        <div className="absolute bottom-[-35px] left-1/2 z-[99] mx-auto my-auto flex h-[70px] w-full max-w-[300px] -translate-x-1/2 transform items-center justify-between overflow-hidden rounded-lg border border-primary bg-primary px-3 transition-all duration-500 sm:w-full sm:max-w-[400px] md:bottom-[-50px] md:h-[100px] md:w-full md:max-w-[700px] lg:bottom-[-50px] lg:w-full lg:max-w-[900px]">
          <div className="flex w-full items-center justify-around overflow-hidden transition-all duration-500 md:justify-between">
            {Process.map((item, index: number) => (
              <div
                className="flex items-center justify-between gap-2 transition-all duration-500"
                key={index}
              >
                <div>{item.icon}</div>
                <div className="hidden flex-col gap-3 transition-all duration-500 md:flex">
                  <p className="text-[11px] font-bold text-[#fff] transition-all duration-500 lg:text-sm xl:text-sm">
                    {item.name}
                  </p>
                  <p className="text-[10px] font-light text-white transition-all duration-500 lg:text-sm xl:text-sm">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselHome;
