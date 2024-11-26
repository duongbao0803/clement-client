"use client";
import React, { useEffect, useState } from "react";

import { TagCustom } from "@/components/common";
import { tableFavorite } from "@/constants";
import { CloseOutlined } from "@ant-design/icons";
import Imagee from "@/assets/images/logo/avatar_admin.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useDeleteFavoriteAllMutation,
  useDeleteFavoriteMutation,
  useGetFavorListQuery,
} from "@/apis/favoriteProductApi";
import { notify } from "@/components/common/Notification";
import NotFoundImage from "@/assets/images/logo/no-products.png";
import { FavoriteProps } from "@/types/favorite.types";
import { useDispatch } from "react-redux";
import { clearFavoriteCount } from "@/redux/slices/favoriteSlice";
import useToken from "antd/es/theme/useToken";
import { skipToken } from "@reduxjs/toolkit/query";
import Link from "next/link";

const FavoriteTable = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useToken();
  const { data: favoriteList = [], refetch } = useGetFavorListQuery(
    token ? { PageIndex: 1, PageSize: 50 } : skipToken,
  );

  useEffect(() => {
    refetch();
  }, [favoriteList.length, refetch]);

  const [deleteAll] = useDeleteFavoriteAllMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const handleDeleteItem = async (id: number) => {
    try {
      const res = await deleteFavorite(id).unwrap();
      if (res) {
        notify("success", `Xóa sản phẩm yêu thích khỏi danh sách`, 2);
        refetch();
      }
    } catch (err: any) {
      notify("error", `${err?.data?.message}`, 3);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteAll({}).unwrap();
      if (res && res.httpCode === 200) {
        notify("success", `${res?.message}`, 2);
        dispatch(clearFavoriteCount());
        refetch();
      }
    } catch (err: any) {
      notify("error", `${err?.data?.message}`, 3);
    }
  };

  return (
    <section className="mt-5">
      {favoriteList && favoriteList.length > 0 ? (
        <>
          <div className="overflow-x-auto bg-[#fff]">
            <table className="min-w-full border-[0.5px] border-gray-200 bg-white">
              <thead className="rounded bg-gray-100">
                <tr>
                  {tableFavorite.map((data, index: number) => (
                    <th
                      key={index}
                      className="p-6 text-left font-normal tracking-wider"
                    >
                      {data}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {favoriteList.map((item: FavoriteProps, index: number) => (
                  <>
                    <tr className="border-b-0 border-t" key={index}>
                      <td className="sticky left-0 z-10 bg-white px-6 py-[34px]">
                        <div className="flex items-center">
                          <Image
                            height={100}
                            width={100}
                            quality={100}
                            src={Imagee}
                            className="mr-4 h-12 w-12 rounded-[100%]"
                            alt="Store Image"
                          />
                          <span>{item?.storeName}</span>
                        </div>
                      </td>
                      <Link href={`product/${item?.productId}`}>
                        <td className="px-6 py-12">
                          <div className="flex items-center">
                            <Image
                              height={100}
                              width={100}
                              quality={100}
                              src={item?.productImage}
                              className="mr-4 h-12 w-12 rounded-[100%]"
                              alt="Product Image"
                            />
                            <span>{item.productName}</span>
                          </div>
                        </td>
                      </Link>

                      <td className="px-6 py-12">
                        {item?.productPrices[0]?.price}
                      </td>
                      <td className="px-6 py-12">
                        <TagCustom
                          color="green"
                          label="CÒN HÀNG"
                          closable={false}
                          className="text-[13px]"
                        />
                      </td>
                      <td className="px-6 py-12 text-center">
                        <CloseOutlined
                          onClick={() => handleDeleteItem(item?.id)}
                          className="cursor-pointer text-xl text-red-500"
                        />
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 flex justify-between">
            <button
              onClick={() => router.push("/product")}
              className="w-[230px] rounded-3xl border-2 border-primary bg-primary py-2 font-bold text-[white] transition-all duration-500 ease-in-out hover:rounded-none hover:border-primary hover:bg-[white] hover:tracking-widest hover:text-primary"
            >
              Tiếp tục mua hàng
            </button>
            <button
              onClick={handleDelete}
              className="w-[230px] rounded-3xl border-2 border-primary bg-primary py-2 font-bold text-[white] transition-all duration-500 ease-in-out hover:rounded-none hover:border-primary hover:bg-[white] hover:tracking-widest hover:text-primary"
            >
              Xóa danh sách
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <Image
            src={NotFoundImage}
            width={1000}
            height={1000}
            quality={100}
            alt="product"
            className="h-auto w-[500px] object-contain p-3 transition-all duration-300 ease-in-out group-hover:scale-110"
          />
        </div>
      )}
    </section>
  );
};

export default FavoriteTable;
