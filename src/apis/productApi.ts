import { ProductInfo } from "@/types/product.types";
import apiSlice from "./apiSlice";

interface ProductResponse {
  items: ProductInfo[];
  totalCount: number;
}

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductList: builder.query<
      ProductResponse,
      {
        PageIndex: number;
        PageSize: number;
        CategoryId: number;
        name: string;
        MinPrice: number;
        MaxPrice: number;
        StoreId: number;
      }
    >({
      query: ({
        PageIndex,
        PageSize,
        CategoryId,
        name,
        MinPrice,
        MaxPrice,
        StoreId,
      }) => ({
        url: `/products?PageIndex=${PageIndex}&PageSize=${PageSize}&StoreId=${StoreId}&CategoryId=${CategoryId}&MinPrice=${MinPrice}&MaxPrice=${MaxPrice}&Search=${name}`,
        method: "GET",
      }),
      transformResponse: (response: ProductInfo[], meta) => {
        const paginationHeader =
          meta && meta.response?.headers.get("x-pagination");
        let totalCount = 0;
        if (paginationHeader) {
          try {
            const paginationData = JSON.parse(paginationHeader);
            totalCount = paginationData.TotalCount || 0;
          } catch (error) {}
        }

        return {
          items: response,
          totalCount,
        };
      },
    }),
    getDetailProduct: builder.query({
      query: ({ productId }) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductListQuery, useGetDetailProductQuery } = productApi;

export default productApi;
