import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const sizeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSizes: builder.query({
      query: () => ({
        url: `/size`,
        method: "GET",
      }),
      providesTags: [tagTypes.productSize],
    }),
    getSingleSize: builder.query({
      query: (id: string) => ({
        url: `/size/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.productSize],
    }),
    createSize: builder.mutation({
      query: (data) => ({
        url: `/size`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.productSize],
    }),
    updateSize: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/size/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.productSize],
    }),
    deleteSize: builder.mutation({
      query: (id: string) => ({
        url: `/size/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.productSize],
    }),
  }),
});

export const {
  useGetAllSizesQuery,
  useGetSingleSizeQuery,
  useCreateSizeMutation,
  useUpdateSizeMutation,
  useDeleteSizeMutation,
} = sizeApi;
