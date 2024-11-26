"use client";
import { useGetDetailPostQuery } from "@/apis/postApi";
import { useGetDetailProductQuery } from "@/apis/productApi";
import useAddToCart from "@/app/product/hooks/useAddToCart";
import { ScrollReveal } from "@/components";
import { PriceFormat } from "@/utils";
import { Rate, Spin } from "antd";
import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const PostDetail = () => {
  const { id } = useParams();
  const { data: postDetail, isLoading } = useGetDetailPostQuery({ postId: id });
  const { data: productDetail } = useGetDetailProductQuery({
    productId: postDetail?.productId,
  });
  const { handleAddToCart } = useAddToCart();

  return (
    <div>
      {isLoading ? (
        <Spin size="large" tip="Đang chờ..." fullscreen />
      ) : (
        <>
          <div className="my-16 flex flex-col gap-8">
            <h1 className="text-left text-4xl font-bold">
              {postDetail?.title}
            </h1>
            <Image
              src={postDetail?.image ?? ""}
              alt="post-image"
              height={500}
              width={500}
              quality={100}
              className="h-[400px] w-full object-cover"
            />
            <div>{postDetail?.content ? parse(postDetail.content) : ""}</div>
          </div>

          <div className="relative mt-12">
            <h3 className="text-center text-2xl font-bold text-primary lg:text-4xl">
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
            <ScrollReveal>
              <div className="relative my-5 cursor-pointer rounded-lg border-[0.5px] bg-white shadow-md transition-all duration-700 ease-in-out hover:shadow-lg">
                <div className="flex h-96 flex-col items-center justify-center transition-all duration-700 ease-in-out">
                  <div className="group relative h-full w-full overflow-hidden">
                    <Image
                      src={productDetail?.image ?? ""}
                      width={1000}
                      height={1000}
                      quality={100}
                      alt="product"
                      className="h-full w-full object-contain p-3 transition-all duration-300 ease-in-out group-hover:scale-110"
                    />

                    <button className="absolute bottom-0 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-50 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:transform group-hover:opacity-100">
                      <p className="text-md mx-5 border-2 p-2 font-semibold text-[#fff] hover:bg-[#fff] hover:text-black xl:text-lg">
                        <button onClick={() => handleAddToCart(productDetail)}>
                          + Thêm vào giỏ hàng
                        </button>
                      </p>
                    </button>
                    {/* <Tooltip
                          title={
                            favoriteList.includes(product?.id)
                              ? "Đã có trong danh sách yêu thích"
                              : "Thêm vào danh sách yêu thích"
                          }
                          placement="top"
                        >
                          <button
                            className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 transition-all duration-500 hover:bg-gray-200"
                            onClick={() => handleToggleFavorite(product)}
                          >
                            {favoriteList.some(
                              (favorite: { productId: number }) =>
                                favorite.productId === product.id,
                            ) ? (
                              <AiFillHeart className="text-xl text-red-500" />
                            ) : (
                              <AiOutlineHeart className="text-xl text-gray-500" />

                            )}
                          </button>
                        </Tooltip> */}
                  </div>
                  <Link href={`/product/${productDetail?.id}`}>
                    <div className="flex flex-col items-center p-4 text-center">
                      <h3 className="mb-2 text-lg">{productDetail?.name}</h3>
                      <Rate
                        disabled
                        value={productDetail?.rating || 5}
                        className="mb-2 text-sm"
                      />
                      <p className="mb-2 text-xl font-bold">
                        <span className="text-primary">
                          {PriceFormat.format(productDetail?.price[0]?.price)} /{" "}
                          {productDetail?.price[0]?.unit?.name || ""}
                        </span>
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 transform">
                  <p className="text-[12px] font-normal text-gray-400">
                    {productDetail?.storeName}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetail;
