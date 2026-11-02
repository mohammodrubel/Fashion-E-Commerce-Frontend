import { baseApi } from "@/redux/api/baseApi";
import { tagTypes } from "@/redux/tagTypes";

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  sort?: "name" | "price" | "createdAt" | "updatedAt";
  order?: "asc" | "desc";
  searchTerm?: string;
  category?: string;
  status?: "ACTIVE" | "INACTIVE" | "DRAFT";
  minPrice?: number | string;
  maxPrice?: number | string;
  stockStatus?: "IN_STOCK" | "LOW_STOCK" | "OUT_OF_STOCK";
  featured?: boolean | string;
  tags?: string;
  startDate?: string;
  endDate?: string;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (params: ProductQueryParams = {}) => ({
        url: `/product`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.product],
    }),
    getSingleProduct: builder.query({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),
    createProduct: builder.mutation({
      query: (data: FormData) => ({
        url: `/product`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }: { id: string; data: FormData }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
