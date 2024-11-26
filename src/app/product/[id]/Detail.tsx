"use client";
import {
  useGetDetailProductQuery,
  useGetProductListQuery,
} from "@/apis/productApi";
import NotFoundImage from "@/assets/images/logo/not-found.jpg";
import { ProductInfo } from "@/types/product.types";
import { PriceFormat } from "@/utils";
import { Divider, Rate, Skeleton, Spin, Tabs, Tag, Tooltip } from "antd";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAddToCart from "../hooks/useAddToCart";

import {
  useAddFavoriteMutation,
  useGetFavorListQuery,
} from "@/apis/favoriteProductApi";
import { ScrollReveal } from "@/components";
import { notify } from "@/components/common/Notification";
import { getToken } from "@/hooks/useToken";
import useUserInfo from "@/hooks/useUserInfo";
import { skipToken } from "@reduxjs/toolkit/query";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import Imagee from "@/assets/images/logo/avatar_admin.jpg";
import { useGetStoreDetailQuery } from "@/apis/storeApi";
import { ButtonCustom } from "@/components/ui/button";
import StoreInfoModal from "./StoreInfoModal";
import { TagCustom } from "@/components/common";

const Detail = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: product, isLoading } = useGetDetailProductQuery({
    productId: id,
  });
  const { data: productData } = useGetProductListQuery({
    PageIndex: 1,
    PageSize: 10,
    CategoryId: product?.categoryId,
    name: "",
    MinPrice: 0,
    MaxPrice: 0,
    StoreId: 0,
  });
  const { data: store } = useGetStoreDetailQuery(
    {
      storeId: product?.storeId,
    },
    {
      skip: !product?.storeId,
    },
  );
  const typedProduct = product as ProductInfo;
  const [selectedPrice, setSelectedPrice] = useState<number>(
    typedProduct?.price[0]?.price,
  );
  const [quantity, setQuantity] = useState<number>(1);
  const { TabPane } = Tabs;

  const { handleAddToCart } = useAddToCart();
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) setQuantity(newQuantity);
  };

  const handleAddToCartWithQuantity = () => {
    handleAddToCart(typedProduct, quantity);
  };

  useEffect(() => {
    if (typedProduct?.price?.length > 0) {
      setSelectedPrice(typedProduct.price[0].price);
    }
  }, [typedProduct]);
  const { userInfo } = useUserInfo();
  const token = getToken();

  const [addFavorite] = useAddFavoriteMutation();

  const { data: favoriteList = [], refetch } = useGetFavorListQuery(
    token ? { PageIndex: 1, PageSize: 50 } : skipToken,
  );
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [prevFavoriteList, setPrevFavoriteList] = useState([]);

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
    <div className="container mx-auto bg-white p-6">
      {isLoading ? (
        <Spin size="large" tip="Đang chờ..." fullscreen />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <Image
                src={typedProduct?.image}
                height={2000}
                width={2000}
                quality={100}
                alt="sản phẩm"
                className="max-h-[400px] w-full rounded-lg object-contain transition-opacity duration-300"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-700">
                {typedProduct?.name}
              </h2>
              <div className="mt-2 items-center">
                <div className="my-2 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>&#9733;</span>
                  ))}
                  {/* <span className="text-gray-400">&#9733;</span> */}
                  <span className="ml-2 text-gray-400">5/5</span>
                </div>
                <p className="text-[16px] text-gray-500">
                  Thương hiệu:{" "}
                  <span className="text-primary">
                    {typedProduct?.brand?.name}
                  </span>
                </p>
              </div>
              <p className="my-5 text-3xl font-bold text-primary">
                {PriceFormat.format(selectedPrice)}
              </p>

              <div className="mt-4 flex items-center space-x-4">
                <div className="flex items-center border border-gray-300">
                  <button
                    className="px-4 py-4 text-gray-500"
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(Number(e.target.value))
                    }
                    className="w-12 border-l border-r border-gray-300 text-center outline-none"
                  />
                  <button
                    className="px-4 py-4 text-gray-500"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCartWithQuantity}
                  type="submit"
                  className="button-hire__custom !w-48 border border-primary border-transparent !py-4 font-normal hover:border hover:font-bold hover:text-primary"
                >
                  + Thêm giỏ hàng
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>

              {/* <div className="flex gap-5">
                {typedProduct?.price?.map((typeUnit, index) => (
                  <div key={index} className="flex gap-5 border border-red-500">
                    <button onClick={() => handleChangeUnit(typeUnit)}>
                      {typeUnit?.unit?.name}
                    </button>
                  </div>
                ))}
              </div> */}
              <div className="mt-6 rounded-md border border-gray-500 p-4">
                <h3 className="mb-2 font-semibold text-gray-700">
                  CHÍNH SÁCH BÁN HÀNG
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-600">
                    <span className="mr-2">&#128663;</span> Miễn phí vận chuyển
                    (Nội thành HCM)
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="mr-2">&#8635;</span> Hoàn trả miễn phí
                    (Trong vòng 24h)
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="mr-2">&#128179;</span> Thanh toán (Chuyển
                    khoản/COD)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="my-10">
            <Divider className="!m-3 bg-gray-200" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={store?.image || Imagee}
                  height={50}
                  width={50}
                  quality={100}
                  alt="avatar-store"
                  className="size-[50px] rounded-[100%]"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm">{productData?.items[0]?.storeName}</p>
                  <p className="text-[12px] text-gray-400">
                    Online 8 tiếng trước
                  </p>

                  <button
                    onClick={() => setIsOpen(true)}
                    className="border border-primary bg-white py-1 text-[12px] text-primary transition-all duration-500 hover:bg-primary hover:text-white"
                  >
                    Xem cửa hàng
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <a href="mailto:fricks.customerservice@gmail.com">
                  <AiOutlineMessage size={30} className="text-primary" />
                </a>
              </div>
            </div>
            <Divider className="!m-3 bg-gray-200" />
          </div>

          <div className="mt-8">
            <Tabs defaultActiveKey="1" className="border-gray-200">
              <TabPane tab="CHI TIẾT" key="1">
                <div className="text-gray-700">
                  <h4 className="mb-2 font-semibold">{typedProduct?.name}</h4>
                  <p className="mb-2">{typedProduct?.description}</p>
                </div>
              </TabPane>
              <TabPane tab="ĐÁNH GIÁ" key="4">
                <div className="text-gray-700">
                  <div className="mt-4">
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-600">Đánh giá của bạn:</p>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="cursor-pointer">
                            &#9733;
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <textarea
                        rows={4}
                        placeholder="Mô tả.."
                        className="w-full rounded-md border border-gray-300 p-2 outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        onClick={() =>
                          notify("info", "Tính năng sắp được triển khai", 2)
                        }
                        className="button-hire__custom mt-2 border border-primary border-transparent !py-1 font-normal hover:border hover:font-bold hover:text-primary"
                      >
                        Gửi
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </button>
                    </div>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
          <div className="relative mt-32">
            <h3 className="text-center text-xl font-bold text-primary lg:text-2xl">
              Sản phẩm liên quan
            </h3>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
              <div className="mt-2 flex w-[200px] items-center justify-center">
                <span className="h-px flex-grow bg-gray-300"></span>
                <span className="mx-2 text-gray-500">&#x2766;</span>
                <span className="h-px flex-grow bg-gray-300"></span>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {productData && productData?.items?.length > 0
              ? productData?.items
                  ?.slice(0, 4)
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
                                <button
                                  onClick={() => handleAddToCart(product)}
                                >
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
                                  onClick={() =>
                                    handleToggleFavorite(product?.id)
                                  }
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
                                  {PriceFormat.format(product?.price[0]?.price)}{" "}
                                  / {product?.price[0]?.unit?.name || ""}
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
          </div>
        </>
      )}
      <StoreInfoModal store={store} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Detail;
