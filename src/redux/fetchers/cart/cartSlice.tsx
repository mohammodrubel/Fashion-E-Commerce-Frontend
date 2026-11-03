import { Product } from "@/lib/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface CartState {
  product: Product[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  product: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.product.find(
        (item) => item.id === action.payload.id
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stock = (action.payload as any).stock as number | undefined;

      if (existingProduct) {
        if (stock !== undefined && existingProduct.quantity + 1 > stock) {
          toast.error("Maximum available stock reached.");
          return;
        }

        existingProduct.quantity += 1;

        state.totalQuantity += 1;
        state.totalAmount += existingProduct.price;

        toast.info("Quantity increased in cart ");
      } else {
        if (stock !== undefined && stock < 1) {
          toast.error("Out of stock");
          return;
        }

        state.product.push({ ...action.payload, quantity: 1 });

        state.totalQuantity += 1;
        state.totalAmount += action.payload.price;

        toast.success("Product added to cart ");
      }
    },

    incrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const existingProduct = state.product.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stock = (existingProduct as any).stock as number | undefined;
        if (stock !== undefined && existingProduct.quantity + 1 > stock) {
          toast.error("Maximum available stock reached.");
          return;
        }

        existingProduct.quantity += 1;
        state.totalQuantity += 1;
        state.totalAmount += existingProduct.price;

        toast.success("Quantity increased ");
      }
    },

    decrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const existingProduct = state.product.find(
        (item) => item.id === action.payload.id
      );

      if (!existingProduct) return;

      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalAmount -= existingProduct.price;

        toast.info("Quantity decreased ");
      } else {
        state.product = state.product.filter(
          (item) => item.id !== action.payload.id
        );

        state.totalQuantity -= 1;
        state.totalAmount -= existingProduct.price;

        toast.error("Product removed from cart ");
      }
    },

    setQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const existingProduct = state.product.find(
        (item) => item.id === action.payload.id
      );
      if (!existingProduct) return;

      // Reject non-numeric, negative, zero, or fractional input outright.
      if (!Number.isFinite(action.payload.quantity) || !Number.isInteger(action.payload.quantity) || action.payload.quantity < 1) {
        toast.error("Enter a valid quantity.");
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stock = (existingProduct as any).stock as number | undefined;
      let quantity = action.payload.quantity;
      if (stock !== undefined && quantity > stock) {
        quantity = stock;
        toast.error("Maximum available stock reached.");
      }

      const diff = quantity - existingProduct.quantity;
      existingProduct.quantity = quantity;
      state.totalQuantity += diff;
      state.totalAmount += diff * existingProduct.price;
    },

    // Re-syncs an item's cached stock cap with a fresh server read (does not
    // change quantity unless the new stock is now lower than it).
    syncStock: (state, action: PayloadAction<{ id: string; stock: number }>) => {
      const existingProduct = state.product.find(
        (item) => item.id === action.payload.id
      );
      if (!existingProduct) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (existingProduct as any).stock = action.payload.stock;

      if (existingProduct.quantity > action.payload.stock) {
        const dropped = existingProduct.quantity - action.payload.stock;
        state.totalQuantity -= dropped;
        state.totalAmount -= existingProduct.price * dropped;

        if (action.payload.stock <= 0) {
          state.product = state.product.filter((item) => item.id !== action.payload.id);
          toast.error("That variant is now out of stock — removed from cart.");
        } else {
          existingProduct.quantity = action.payload.stock;
          toast.warning(`Stock changed — only ${action.payload.stock} available now.`);
        }
      }
    },

    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const existingProduct = state.product.find(
        (item) => item.id === action.payload.id
      );

      if (!existingProduct) return;

      state.totalQuantity -= existingProduct.quantity;
      state.totalAmount -= existingProduct.price * existingProduct.quantity;
      state.product = state.product.filter(
        (item) => item.id !== action.payload.id
      );

      toast.error("Product removed from cart ");
    },

    changeVariant: (
      state,
      action: PayloadAction<{ id: string; sizeId?: string; colorId?: string; price: number; stock?: number }>
    ) => {
      const existingProduct = state.product.find(
        (item) => item.id === action.payload.id
      );

      if (!existingProduct) return;

      state.totalAmount += (action.payload.price - existingProduct.price) * existingProduct.quantity;
      existingProduct.price = action.payload.price;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (existingProduct as any).sizeId = action.payload.sizeId;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (existingProduct as any).colorId = action.payload.colorId;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (existingProduct as any).stock = action.payload.stock;

      if (action.payload.stock !== undefined && existingProduct.quantity > action.payload.stock) {
        const dropped = existingProduct.quantity - action.payload.stock;
        state.totalQuantity -= dropped;
        state.totalAmount -= action.payload.price * dropped;

        if (action.payload.stock <= 0) {
          state.product = state.product.filter((item) => item.id !== action.payload.id);
          toast.error("That variant is out of stock — removed from cart");
        } else {
          existingProduct.quantity = action.payload.stock;
          toast.warning(`Only ${action.payload.stock} in stock — quantity adjusted`);
        }
      } else {
        toast.success("Cart item updated ");
      }
    },

    removeCart: (state) => {
      if (state.product.length === 0) {
        toast.warning("Cart is already empty ");
        return;
      }

      state.product = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;

      toast.success("Cart cleared ");
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  setQuantity,
  syncStock,
  changeVariant,
  removeItem,
  removeCart,
} = cartSlice.actions;

export default cartSlice.reducer;