import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagTypes";
import { RootState } from "../store";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:9000/api",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth?.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
  credentials: "include",
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
  // Keep cached responses in memory for 10 minutes after last subscriber
  // unmounts. Prevents the home page from re-hitting /products*,
  // /new-products, /fetchers-products, etc. on every navigation back.
  keepUnusedDataFor: 600,
  // Do not auto-refetch on window focus / network reconnect. Data
  // invalidation is already handled by RTK Query tag-based invalidation
  // after mutations (invalidatesTags on create/update/delete).
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: false,
});