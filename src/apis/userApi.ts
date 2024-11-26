import apiSlice from "./apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserList: builder.query({
      query: () => "/users",
    }),

    deleteUser: builder.mutation({
      query: (userId: number) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: `/users`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const {
  useGetUserListQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApi;

export default userApi;
