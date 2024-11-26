"use client";

import { useGetAllCatagoryQuery } from "@/apis/categortApi";
import {
  useAddFavoriteMutation,
  useGetFavorListQuery,
} from "@/apis/favoriteProductApi";
import { useGetProductListQuery } from "@/apis/productApi";
import NoProducts from "@/assets/images/logo/no-products.png";
import { ScrollReveal, VoiceSearch } from "@/components";
import { RadioCustom, SliderCustom } from "@/components/common";
import { notify } from "@/components/common/Notification";
import { SortStatus } from "@/enums";
import useDebounce from "@/hooks/useDebounce";
import useUserInfo from "@/hooks/useUserInfo";
import { Category, ProductInfo, ProductPrice } from "@/types/product.types";
import { PriceFormat } from "@/utils";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  Divider,
  Form,
  Pagination,
  Rate,
  Select,
  Skeleton,
  Spin,
  Tooltip,
} from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import useAddToCart from "./hooks/useAddToCart";
import { useGetListStoreQuery } from "@/apis/storeApi";

const { Option } = Select;

const ProductList = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 1000000]);
  const { userInfo } = useUserInfo();
  const debouncedPriceRange = useDebounce(priceRange, 500);
  const [selectedSort, setSelectedSort] = useState<string>("default");
  const { handleAddToCart } = useAddToCart();
  // const { data: favoriteList = [] } = useGetFavorListQuery(undefined, {});
  const { data: categoriesData = [], isLoading } = useGetAllCatagoryQuery(
    undefined,
    {},
  );
  const token = Cookies.get("accessToken");
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [selectedStore, setSelectedStore] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9);
  const [addFavorite] = useAddFavoriteMutation();
  const { data: favoriteList = [], refetch } = useGetFavorListQuery(
    token ? { PageIndex: 1, PageSize: 50 } : skipToken,
  );
  const categories = useMemo(
    () => [{ id: 0, name: "Tất cả" }, ...categoriesData],
    [categoriesData],
  );

  const { data: store } = useGetListStoreQuery({});

  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [prevFavoriteList, setPrevFavoriteList] = useState([]);

  const { data: productData, isFetching } = useGetProductListQuery({
    PageIndex: pageIndex,
    PageSize: pageSize,
    CategoryId: selectedCategory,
    name: debouncedSearchQuery,
    MinPrice: debouncedPriceRange[0],
    MaxPrice: debouncedPriceRange[1],
    StoreId: selectedStore,
  });

  useEffect(() => {
    setSelectedCategory(0);
    setSelectedStore(0);
  }, []);

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
  };

  const handleSelectStore = (value: number) => {
    setSelectedStore(value);
  };
  const handlePageChange = (page: number) => {
    setPageIndex(page);
  };

  const sortProduct = useMemo(() => {
    const items = productData?.items || [];
    if (selectedSort.includes(SortStatus.LOWTOHIGHT)) {
      return [...items].sort(
        (a: ProductInfo, b: ProductInfo) =>
          a?.price[0]?.price - b?.price[0]?.price,
      );
    } else if (selectedSort.includes(SortStatus.HIGHTOLOW)) {
      return [...items].sort(
        (a: ProductInfo, b: ProductInfo) =>
          b?.price[0]?.price - a?.price[0]?.price,
      );
    } else {
      return items;
    }
  }, [productData?.items, selectedSort]);

  const handleSearchUpdate = (query: string) => {
    setSearchQuery(query);
  };

  const handleRadioChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleSliderChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  // const handleToggleFavorite = (product: ProductInfo, item: ProductPrice) => {
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
    <section className="grid grid-cols-1 gap-16 leading-10 transition-all duration-500 md:grid-cols-4">
      <div className="transition-all duration-500 md:col-span-1">
        <div>
          <p className="font-medium">Tìm kiếm</p>
          <div className="relative my-5 flex items-center gap-2 transition-all duration-500 lg:flex">
            <VoiceSearch onSearch={handleSearchUpdate} />
            <Form name="normal_login" className="login-form w-full">
              <Form.Item
                name="name"
                hasFeedback
                colon={true}
                className="formItem"
                noStyle
              >
                <input
                  value={debouncedSearchQuery}
                  placeholder="Tìm kiếm..."
                  type="text"
                  className="w-full rounded-lg px-3 py-2 text-sm ring-1 ring-gray-300 focus:border-0 focus:outline-none focus:ring-1 focus:ring-primary"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
        <p className="font-medium">Danh mục</p>
        <div>
          <SliderCustom
            min={1}
            max={1000000}
            initialValue={[1, 1000000]}
            onChange={handleSliderChange}
          />
        </div>
        <Divider />
        <div className="flow-row flex flex-wrap gap-2 transition-all duration-500 sm:flex-col">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Spin size="large" tip="Đang chờ..." />
            </div>
          ) : (
            categories?.map((cate: Category, index: number) => (
              <div key={index}>
                <RadioCustom
                  title={cate?.name}
                  checked={selectedCategory === cate?.id}
                  onChange={() => handleRadioChange(cate?.id)}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="col-span-1 transition-all duration-500 md:col-span-3">
        <div className="mb-4 flex justify-end gap-3">
          <Select
            defaultValue={0}
            className="w-[30%] md:w-[18%]"
            onChange={handleSelectStore}
          >
            <Option value={0}>Mặc định</Option>
            {store?.map((item: any, index: number) => (
              <Option key={index} value={item?.id}>
                {item?.name}
              </Option>
            ))}
          </Select>
          <Select
            defaultValue="default"
            className="w-[30%] md:w-1/6"
            onChange={handleSortChange}
          >
            <Option value="default">Mặc định</Option>
            <Option value={SortStatus.LOWTOHIGHT}>Thấp đến cao</Option>
            <Option value={SortStatus.HIGHTOLOW}>Cao đến thấp</Option>
          </Select>
        </div>

        <div className="mx-auto mt-4 grid grid-cols-1 justify-center transition-all duration-500 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
          {isFetching ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="my-3 mr-4 rounded-lg border-[0.2px] border-[#e6e6e6] p-5"
              >
                <Skeleton loading={true} active />
              </div>
            ))
          ) : sortProduct?.length > 0 ? (
            sortProduct?.map((product: ProductInfo) =>
              product?.price?.map((item: ProductPrice, index: number) => (
                <ScrollReveal key={index}>
                  <div className="relative mx-auto my-5 h-[400px] max-w-[350px] cursor-pointer rounded-lg border-[0.5px] bg-white shadow-md transition-all duration-500 ease-in-out hover:shadow-lg sm:w-[260px] md:w-[260px]">
                    <div className="relative flex h-96 flex-col items-center justify-center transition-all duration-500">
                      <div className="group relative h-full w-full overflow-hidden transition-all duration-500">
                        <Image
                          src={product?.image ?? ""}
                          width={1000}
                          height={1000}
                          quality={100}
                          alt="product"
                          className="h-full w-full object-contain p-3 transition-all duration-300 ease-in-out group-hover:scale-110"
                        />
                        <button className="absolute bottom-0 flex h-full w-full cursor-default items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:transform group-hover:opacity-100">
                          <p className="mx-5 cursor-pointer border-2 p-2 text-[16px] font-semibold text-[#fff] hover:bg-[#fff] hover:text-black xl:text-lg">
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
                              {PriceFormat.format(item?.price)} / {""}
                              {item?.unit?.name || ""}
                            </span>
                          </p>
                        </div>
                      </Link>
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transform">
                      <p className="text-[12px] font-normal text-gray-400">
                        {product?.storeName}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              )),
            )
          ) : (
            <div className="col-span-1 grid place-items-center text-center text-lg font-bold text-gray-500 md:col-span-3">
              <Image
                alt="error"
                src={NoProducts}
                width={500}
                height={500}
                quality={100}
              />
            </div>
          )}
        </div>
        <Pagination
          current={pageIndex}
          total={productData?.totalCount || 0}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          className="mt-4 flex justify-end"
        />
      </div>
    </section>
  );
};

export default ProductList;
