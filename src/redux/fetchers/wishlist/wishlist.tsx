import { Product } from "@/lib/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// An item sitting in the wishlist always carries the toggle flag; the
// `Product` dispatched to addToWishlist does not (the reducer sets it).
type WishlistLine = Product & { wishlist: boolean };

interface WishlistState {
  product: WishlistLine[];
  totalwishlistProduct: number;
}

const initialState: WishlistState = {
  product: [],
  totalwishlistProduct: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.product.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        // toggle wishlist property
        existingProduct.wishlist = !existingProduct.wishlist;
      } else {
        // add new product with wishlist true
        state.product.push({
          ...action.payload,
          wishlist: true,
        });
      }

      // update count
      state.totalwishlistProduct = state.product.filter(
        (item) => item.wishlist
      ).length;
    },

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      const product = state.product.find(
        (item) => item.id === action.payload
      );

      if (product) {
        product.wishlist = false;
      }

      state.totalwishlistProduct = state.product.filter(
        (item) => item.wishlist
      ).length;
    },

    clearWishlist: (state) => {
      state.product.forEach((item) => {
        item.wishlist = false;
      });

      state.totalwishlistProduct = 0;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;