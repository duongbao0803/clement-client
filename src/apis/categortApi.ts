import apiSlice from "./apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCatagory: builder.query({
      query: () => ({
        url: "/categories/get-all-category",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllCatagoryQuery } = categoryApi;

export default categoryApi;
