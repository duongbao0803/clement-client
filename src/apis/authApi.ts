import apiSlice from "./apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/authen/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (information) => ({
        url: "/authen/register",
        method: "POST",
        body: information,
      }),
    }),
    loginGoogle: builder.mutation({
      query: (credentials) => ({
        url: "/authen/login-with-google",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken: string) => ({
        url: "/authen/refresh-token",
        method: "POST",
        body: { refreshToken },
      }),
    }),
    confirmEmail: builder.mutation({
      query: (information) => ({
        url: "/authen/confirm/email",
        method: "POST",
        body: information,
      }),
    }),
    resendOTP: builder.mutation({
      query: (email) => ({
        url: "/authen/confirm/resend-otp",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: (email) => ({
        url: "/authen/reset-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPasswordConfirm: builder.mutation({
      query: (information) => ({
        url: "/authen/reset-password/confirm",
        method: "POST",
        body: information,
      }),
    }),
    confirmNewPassword: builder.mutation({
      query: (information) => ({
        url: "/authen/reset-password/new-password",
        method: "POST",
        body: information,
      }),
    }),
    changePassword: builder.mutation({
      query: (information) => ({
        url: "/authen/change-password",
        method: "POST",
        body: information,
      }),
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: "/authen/current-user",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useRegisterMutation,
  useLoginGoogleMutation,
  useConfirmEmailMutation,
  useGetUserInfoQuery,
  useResendOTPMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useConfirmNewPasswordMutation,
  useChangePasswordMutation,
} = authApi;

export default authApi;
