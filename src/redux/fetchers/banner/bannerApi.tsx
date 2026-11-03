import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBanners: builder.query({
      query: () => ({
        url: `/banner`,
        method: "GET",
      }),
      providesTags: [tagTypes.banner],
    }),
    getActiveBanner: builder.query({
      query: () => ({
        url: `/banner/active`,
        method: "GET",
      }),
      providesTags: [tagTypes.banner],
    }),
    getSingleBanner: builder.query({
      query: (id: string) => ({
        url: `/banner/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.banner],
    }),
    createBanner: builder.mutation({
      query: (data: FormData) => ({
        url: `/banner`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.banner],
    }),
    updateBanner: builder.mutation({
      query: ({ id, data }: { id: string; data: FormData }) => ({
        url: `/banner/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.banner],
    }),
    deleteBanner: builder.mutation({
      query: (id: string) => ({
        url: `/banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.banner],
    }),
  }),
});

export const {
  useGetAllBannersQuery,
  useGetActiveBannerQuery,
  useGetSingleBannerQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
