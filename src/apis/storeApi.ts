import apiSlice from "./apiSlice";

const storeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStoreDetail: builder.query({
      query: ({ storeId }) => ({
        url: `/stores/${storeId}`,
        method: "GET",
      }),
    }),
    getListStore: builder.query({
      query: () => ({
        url: `/stores`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStoreDetailQuery, useGetListStoreQuery } = storeApi;

export default storeApi;
