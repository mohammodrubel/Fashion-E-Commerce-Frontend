import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const colorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllColors: builder.query({
      query: () => ({
        url: `/color`,
        method: "GET",
      }),
      providesTags: [tagTypes.productColor],
    }),
    getSingleColor: builder.query({
      query: (id: string) => ({
        url: `/color/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.productColor],
    }),
    createColor: builder.mutation({
      query: (data) => ({
        url: `/color`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.productColor],
    }),
    updateColor: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/color/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.productColor],
    }),
    deleteColor: builder.mutation({
      query: (id: string) => ({
        url: `/color/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.productColor],
    }),
  }),
});

export const {
  useGetAllColorsQuery,
  useGetSingleColorQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} = colorApi;
