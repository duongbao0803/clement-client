import { OrderInfo } from "@/types/order.types";
import apiSlice from "./apiSlice";

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    order: builder.mutation({
      query: (formData) => ({
        url: "/orders/payment",
        method: "POST",
        body: formData,
      }),
    }),
    getListOrder: builder.query({
      query: ({ PageIndex, PageSize, orderStatus, paymentStatus }) => ({
        url: `/orders?PageIndex=${PageIndex}&PageSize=${PageSize}&SortBy=date&Dir=desc`,
        method: "GET",
      }),
    }),
    getOrderStatus: builder.query({
      query: ({ orderId }) => ({
        url: `/orders/${orderId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useOrderMutation,
  useGetOrderStatusQuery,
  useGetListOrderQuery,
} = orderApi;

export default orderApi;
