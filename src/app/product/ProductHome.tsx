"use client";

import { useGetAllCatagoryQuery } from "@/apis/categortApi";
import {
  useAddFavoriteMutation,
  useGetFavorListQuery,
} from "@/apis/favoriteProductApi";
import { useGetProductListQuery } from "@/apis/productApi";
import NotFoundImage from "@/assets/images/logo/not-found.jpg";
import { ScrollReveal } from "@/components";
import { notify } from "@/components/common/Notification";
import useUserInfo from "@/hooks/useUserInfo";
import { ProductInfo } from "@/types/product.types";
import { PriceFormat } from "@/utils";
import { skipToken } from "@reduxjs/toolkit/query";
import { Rate, Skeleton, Tooltip } from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useAddToCart from "./hooks/useAddToCart";
import intro from "@/assets/images/intro/intro.png";

const ProductHome = () => {
  const { userInfo } = useUserInfo();
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const { data: categoriesData = [], isLoading } = useGetAllCatagoryQuery(
    undefined,
    {},
  );

  const { handleAddToCart } = useAddToCart();
  // const isFavorite = useSelector(
  //   (state: RootState) => state.persistedReducer.favorites.isFavorite,
  // );
  const [addFavorite] = useAddFavoriteMutation();

  const { data: favoriteList = [], refetch } = useGetFavorListQuery(
    token ? { PageIndex: 1, PageSize: 50 } : skipToken,
  );
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [prevFavoriteList, setPrevFavoriteList] = useState([]);

  const categories = useMemo(
    () => [{ id: 0, name: "Tất cả" }, ...categoriesData],
    [categoriesData],
  );

  useEffect(() => {
    const selectedCategoryElement = document.getElementById(
      `category-${selectedCategory}`,
    );
    if (indicatorRef.current && selectedCategoryElement) {
      const { offsetLeft, offsetWidth } = selectedCategoryElement;
      indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`;
      indicatorRef.current.style.width = `${offsetWidth}px`;
    }
  }, [selectedCategory]);

  const { data: productData } = useGetProductListQuery({
    PageIndex: 1,
    PageSize: 10,
    CategoryId: selectedCategory,
    name: "",
    MinPrice: 0,
    MaxPrice: 0,
    StoreId: 0,
  });

  // const handleToggleFavorite = (product: ProductInfo) => {
  //   toggleFavorite(product?.id);
  // };

  useEffect(() => {
    if (JSON.stringify(prevFavoriteList) !== JSON.stringify(favoriteList)) {
      const initialFavorites = favoriteList.reduce(
        (
          acc: { [x: string]: boolean },
          favorite: { productId: string | number },
        ) => {
          acc[favorite.productId] = true;
          return acc;
        },
        {},
      );
      setFavorites(initialFavorites);
      setPrevFavoriteList(favoriteList);
    }
  }, [favoriteList]);

  const handleToggleFavorite = async (productId: number) => {
    if (!favorites[productId]) {
      const res = await addFavorite({ productId }).unwrap();
      if (res) {
        notify(
          "success",
          `Đã thêm ${res?.productName} vào danh sách yêu thích`,
          2,
        );
        setFavorites((prev) => ({
          ...prev,
          [productId]: true,
        }));
      }
    }
  };

  return (
    <section className="container mx-auto">
      <div className="relative mb-44 mt-12">
        <h3 className="text-center text-3xl font-bold text-primary lg:text-4xl">
          Đặc điểm nổi bật
        </h3>
        <div className="relative my-20">
          <div className="flex justify-between gap-2">
            <div className="flex flex-1 flex-col justify-between text-right">
              <div className="mb-10">
                <p className="text-xl font-semibold text-primary">
                  Tính an toàn
                </p>
                <p className="text-sm">
                  Sản phẩm đã được kiểm tra, thí nghiệm thực tế, an toàn cho
                  người tiêu dùng hàng ngày.
                </p>
              </div>
              <div className="bottom-0 text-right">
                <p className="text-xl font-semibold text-primary">
                  Ưu điểm nổi bật
                </p>
                <p className="text-sm">
                  Màng bọc sau khi sử dụng có thể tự phân hủy, nhằm bảo vệ môi
                  trường, tạo sự an tâm cho người dùng về môi trường xanh.
                </p>
              </div>
            </div>
            <div className="flex-2">
              <Image
                height={3000}
                width={3000}
                quality={100}
                src={intro}
                className="h-full w-[600px]"
                alt="Product Image"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between text-left">
              <div className="">
                <p className="text-xl font-semibold text-primary">Tiện ích</p>
                <p className="text-sm">
                  Có tính kháng khuẩn cao hơn các loại màng bọc PE thông thường.
                </p>
              </div>
              <div className="bottom-0 text-left">
                <p className="text-xl font-semibold text-primary">
                  Tại sao nên chọn Chitosan
                </p>
                <p className="text-sm">
                  Làm từ nhiên liệu với{" "}
                  <span className="font-semibold text-primary">
                    KHẢ NĂNG TỰ PHÂN HỦY
                  </span>{" "}
                  của Chitosan hiệu quả gấp 2 - 3 lần màng bọc thực phẩm bình
                  thường. 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mx-auto mt-20 max-w-[700px]">
        <div className="scroll relative flex flex-nowrap space-x-2 overflow-x-scroll px-2">
          <div
            ref={indicatorRef}
            className="absolute inset-0 z-[-1] mb-3 h-full rounded-md bg-primary transition-transform duration-500 ease-in-out"
          />
          {categories.map((category, index) => (
            <div
              key={index}
              id={`category-${category.id}`}
              className={`relative flex-shrink-0 cursor-pointer p-2 transition-colors duration-500 ${selectedCategory === category.id ? "text-white" : "text-black"}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div> */}
      {/* <div className="mx-auto mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {productData && productData?.items?.length > 0
          ? productData?.items
              ?.slice(0, 8)
              .map((product: ProductInfo, index: number) => (
                <ScrollReveal key={index}>
                  <div className="relative my-5 cursor-pointer rounded-lg border-[0.5px] bg-white shadow-md transition-all duration-700 ease-in-out hover:shadow-lg">
                    <div className="flex h-96 flex-col items-center justify-center transition-all duration-700 ease-in-out">
                      <div className="group relative h-full w-full overflow-hidden">
                        <Image
                          src={product?.image ?? NotFoundImage}
                          width={1000}
                          height={1000}
                          quality={100}
                          alt="product"
                          className="h-full w-full object-contain p-3 transition-all duration-300 ease-in-out group-hover:scale-110"
                        />

                        <button className="absolute bottom-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:transform group-hover:opacity-100">
                          <p className="text-md mx-5 border-2 p-2 font-semibold text-[#fff] hover:bg-[#fff] hover:text-black xl:text-lg">
                            <button onClick={() => handleAddToCart(product)}>
                              + Thêm vào giỏ hàng
                            </button>
                          </p>
                        </button>
                        {userInfo && (
                          <Tooltip
                            title={
                              favorites[product.id]
                                ? "Đã có trong danh sách yêu thích"
                                : "Thêm vào danh sách yêu thích"
                            }
                            placement="top"
                          >
                            <button
                              className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 transition-all duration-500 hover:bg-gray-200"
                              onClick={() => handleToggleFavorite(product?.id)}
                              disabled={favorites[product.id]}
                            >
                              {favorites[product.id] ? (
                                <AiFillHeart className="text-xl text-red-500" />
                              ) : (
                                <AiOutlineHeart className="text-xl text-gray-500" />
                              )}
                            </button>
                          </Tooltip>
                        )}
                      </div>
                      <Link href={`/product/${product?.id}`}>
                        <div className="flex flex-col items-center p-4 text-center">
                          <h3 className="mb-2 text-lg">{product?.name}</h3>
                          <Rate
                            disabled
                            value={product?.rating || 5}
                            className="mb-2 text-sm"
                          />
                          <p className="mb-2 text-xl font-bold">
                            <span className="text-primary">
                              {PriceFormat.format(product?.price[0]?.price)} /{" "}
                              {product?.price[0]?.unit?.name || ""}
                            </span>
                          </p>
                        </div>
                      </Link>
                    </div>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 transform">
                      <p className="text-[12px] font-normal text-gray-400">
                        {product?.storeName}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))
          : Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="my-3 rounded-lg border-[0.2px] border-[#e6e6e6] p-5"
              >
                <Skeleton loading={true} active />
              </div>
            ))}
      </div> */}

      {/* {productData && productData?.items?.length > 0 && (
        <div className="my-7 flex justify-center">
          <button
            onClick={() => router.push("/product")}
            type="submit"
            className="button-hire__custom !w-[300px] border-2 border-primary !py-3 text-lg font-semibold transition-all duration-700 ease-in-out hover:rounded-2xl hover:border-2 hover:font-bold hover:text-primary"
          >
            Xem thêm {">"}
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      )} */}
    </section>
  );
};

export default ProductHome;
