import { Page } from "@/types/page.types";
import apiSlice from "./apiSlice";

const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostList: builder.query({
      query: ({ PageIndex, PageSize }: Page) => ({
        url: `/posts?PageIndex=${PageIndex}&PageSize=${PageSize}&SortBy=date&Dir=desc`,
        method: "GET",
      }),
    }),
    getDetailPost: builder.query({
      query: ({ postId }) => ({
        url: `/posts/${postId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPostListQuery, useGetDetailPostQuery } = postApi;

export default postApi;
