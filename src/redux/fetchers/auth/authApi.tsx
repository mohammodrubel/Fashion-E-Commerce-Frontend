import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/change-password`,
        method: "PATCH",
        body: data,
      }),
    }),
    setPassword: builder.mutation<
      { success: boolean; message: string },
      { new_password: string }
    >({
      query: (data) => ({
        url: `/auth/set-password`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `/auth/register`,
        method: "POST",
        body: data,
      }),
    }),
    googleLogin: builder.mutation<
      { success: boolean; data: { access_token: string } },
      { id_token: string }
    >({
      query: (data) => ({
        url: `/auth/google`,
        method: "POST",
        body: data,
      }),
    }),
    logoutFromDb: builder.mutation({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation<
      { success: boolean; message: string },
      { email: string }
    >({
      query: (data) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<
      { success: boolean; message: string },
      { token: string; password: string }
    >({
      query: (data) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useLoginMutation,
  useLogoutFromDbMutation,
  useRegisterMutation,
  useGoogleLoginMutation,
  useSetPasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;