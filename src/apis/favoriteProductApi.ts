import {
  decrementFavoriteCount,
  incrementFavoriteCount,
} from "@/redux/slices/favoriteSlice";
import apiSlice from "./apiSlice";

const favoriteProductApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavorList: builder.query({
      query: ({ PageIndex, PageSize }) => ({
        url: `/favorites/user?PageIndex=${PageIndex}&PageSize=${PageSize}`,
        method: "GET",
      }),
    }),
    addFavorite: builder.mutation({
      query: (productId) => ({
        url: "/favorites",
        method: "POST",
        body: productId,
      }),
      async onQueryStarted(productId, { dispatch, queryFulfilled }) {
        dispatch(incrementFavoriteCount());
        try {
          await queryFulfilled;
        } catch {
          dispatch(decrementFavoriteCount());
        }
      },
    }),
    deleteFavorite: builder.mutation({
      query: (productId) => ({
        url: `/favorites/${productId}`,
        method: "DELETE",
      }),
      async onQueryStarted(productId, { dispatch, queryFulfilled }) {
        dispatch(decrementFavoriteCount());
        try {
          await queryFulfilled;
        } catch {
          dispatch(incrementFavoriteCount());
        }
      },
    }),
    deleteFavoriteAll: builder.mutation({
      query: () => ({
        url: "favorites/all",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFavorListQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useDeleteFavoriteAllMutation,
} = favoriteProductApi;

export default favoriteProductApi;
