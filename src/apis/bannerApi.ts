import apiSlice from "./apiSlice";

const bannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListBanner: builder.query({
      query: () => ({
        url: `/banners`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetListBannerQuery } = bannerApi;

export default bannerApi;
