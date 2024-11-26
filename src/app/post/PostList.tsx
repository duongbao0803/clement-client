"use client";
import { useGetPostListQuery } from "@/apis/postApi";
import { PostInfo } from "@/types/post.types";
import { Divider, Flex, Skeleton, Tag } from "antd";
import Image from "next/image";
import Link from "next/link";
import { RiInstagramFill } from "react-icons/ri";
import PostImage from "@/assets/images/item/post.jpg";
import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { formatTimestampWithHour } from "@/utils";
import parse from "html-react-parser";

const PostList = () => {
  const { data } = useGetPostListQuery({
    PageIndex: 1,
    PageSize: 100,
  });

  return (
    <section className="container mx-auto">
      <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-2">
          {data?.length > 0
            ? data?.slice(0, 8).map((item: PostInfo, index: number) => (
                <div key={index}>
                  <div className="relative z-[50] mb-16 block lg:flex">
                    <Image
                      src={item?.image}
                      width={250}
                      height={250}
                      quality={100}
                      alt="post"
                      className="h-[300px] w-full rounded-lg object-cover transition-all duration-300 ease-in-out lg:h-[150px] lg:w-[230px]"
                    />
                    <div className="flex flex-col items-start justify-start lg:pl-5">
                      <Link href={`/post/${item?.id}`}>
                        <h3 className="mb-2 text-lg font-semibold transition-all duration-500 hover:text-primary md:text-xl">
                          {item?.title}
                        </h3>
                      </Link>

                      <span className="line-clamp-2 block overflow-hidden text-sm text-gray-400">
                        {parse(item?.content)}
                      </span>
                      <p className="absolute bottom-[-30px] line-clamp-2 block overflow-hidden text-[12px] font-light lg:bottom-0">
                        {formatTimestampWithHour(item.createDate)}
                      </p>
                    </div>
                    <div className="absolute bottom-[-30px] right-0 z-[51] flex items-center gap-2 lg:bottom-0">
                      <p className="text-sm font-light">Chia sẻ:</p>
                      <Link
                        target="_blank"
                        href="https://www.facebook.com/Fricks.BuildingService"
                      >
                        <FaFacebook color="blue" size="22" />
                      </Link>
                      <Link
                        target="_blank"
                        href="https://www.instagram.com/fricks1909/?fbclid=IwZXh0bgNhZW0CMTAAAR0La38zgCvlHNtoE3EUk6vNSm_uqf-9UjtQSnJFQqbctsLz2VkcbEYm9pc_aem_rnkq2BSNbPrtUubJFTRvQw"
                      >
                        <RiInstagramFill color="#d8457e" size="22" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            : Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="my-3 rounded-lg border-[0.2px] border-[#e6e6e6] p-5"
                >
                  <Skeleton loading={true} active />
                </div>
              ))}
        </div>
        <div className="col-span-1">
          <Image
            src={PostImage}
            alt="banner-post"
            width={1000}
            height={1000}
            quality={100}
          />
          <div className="mt-8 flex flex-col gap-2">
            <h3 className="text-lg font-bold text-primary">CHỦ ĐỀ HOT</h3>
            <Divider className="m-0 bg-gray-200"></Divider>
            <Flex gap="10px" wrap>
              <Tag color="orange">Thế giới dụng cụ</Tag>
              <Tag color="orange">Hội chợ </Tag>
              <Tag color="orange">Hội chợ xây dựng</Tag>
              <Tag color="orange">Thế giới dụng cụ</Tag>
              <Tag color="orange">Xây dựng</Tag>
              <Tag color="orange">Công trình</Tag>
            </Flex>
          </div>
          <div className="mt-8 flex flex-col gap-2">
            <h3 className="text-lg font-bold text-primary">
              BÀI VIẾT SẢN PHẨM MỚI
            </h3>
            <Divider className="m-0 bg-gray-200"></Divider>
            <div>
              {data?.length > 0
                ? data?.slice(0, 8).map((item: PostInfo, index: number) => (
                    <div key={index}>
                      <Link
                        href={`/post/${item?.id}`}
                        className="relative mb-5 flex"
                      >
                        <Image
                          src={item?.image}
                          width={250}
                          height={250}
                          quality={100}
                          alt="post"
                          className="h-[80px] w-[80px] rounded-lg object-cover transition-all duration-300 ease-in-out"
                        />
                        <div className="flex flex-col items-start justify-start pl-2 transition-all duration-500 hover:text-primary">
                          <h3 className="mb-2 text-[12px]">{item?.title}</h3>

                          <p className="absolute bottom-0 line-clamp-2 block overflow-hidden text-[10px] font-light">
                            {formatTimestampWithHour(item.createDate)}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))
                : Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="my-3 rounded-lg border-[0.2px] border-[#e6e6e6] p-5"
                    >
                      <Skeleton loading={true} active />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostList;
