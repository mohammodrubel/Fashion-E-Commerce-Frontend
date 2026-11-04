import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export type AddressPayload = {
  fullName?: string;
  phone?: string;
  addressLine?: string;
  city?: string;
  district?: string;
  postalCode?: string;
  isDefault?: boolean;
};

export const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAddresses: builder.query({
      query: () => ({
        url: `/address/me`,
        method: "GET",
      }),
      providesTags: [tagTypes.address],
    }),
    createMyAddress: builder.mutation({
      query: (data) => ({
        url: `/address/me`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.address, tagTypes.user],
    }),
    updateMyAddress: builder.mutation({
      query: ({ id, data }: { id: string; data: AddressPayload }) => ({
        url: `/address/me/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.address, tagTypes.user],
    }),
    deleteMyAddress: builder.mutation({
      query: (id: string) => ({
        url: `/address/me/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.address, tagTypes.user],
    }),
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
  useGetMyAddressesQuery,
  useCreateMyAddressMutation,
  useUpdateMyAddressMutation,
  useDeleteMyAddressMutation,
} = addressApi;
