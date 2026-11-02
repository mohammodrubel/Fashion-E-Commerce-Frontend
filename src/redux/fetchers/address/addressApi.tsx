import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAddresses: builder.query({
      query: (params) => ({
        url: `/address`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.address],
    }),
    getSingleAddress: builder.query({
      query: (id: string) => ({
        url: `/address/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.address],
    }),
    createAddress: builder.mutation({
      query: (data) => ({
        url: `/address`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.address, tagTypes.user],
    }),
    updateAddress: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/address/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.address, tagTypes.user],
    }),
    deleteAddress: builder.mutation({
      query: (id: string) => ({
        url: `/address/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.address, tagTypes.user],
    }),
  }),
});

export const {
  useGetAllAddressesQuery,
  useGetSingleAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
