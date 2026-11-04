import { Product } from "@/lib/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

// An item actually sitting in the cart always has a quantity; the `Product`
// dispatched to addToCart does not (the reducer sets it to 1 on first add).
type CartLine = Product & { quantity: number };

interface CartState {
  product: CartLine[];
  totalQuantity: number;
  totalAmount: number;
}

const initialState: CartState = {
  product: [],
  totalQuantity: 0,
  totalAmount: 0,
};

// A cart line is the product + the exact variant (size/color) selected —
// never the product id alone. Two different variants of the same product
// must stay as separate lines; the same variant added twice must collapse
// into one line with an increased quantity. Missing sizeId/colorId (a
// product without variants, or an old persisted item from before this
// matched on id alone) is normalized to null so both sides compare equal.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSameLine = (item: any, id: string, sizeId?: string, colorId?: string) =>
  item.id === id &&
  (item.sizeId ?? null) === (sizeId ?? null) &&
  (item.colorId ?? null) === (colorId ?? null);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const payload = action.payload as any;
      const existingLine = state.product.find((item) =>
        isSameLine(item, payload.id, payload.sizeId, payload.colorId)
      );
      const stock = payload.stock as number | undefined;

      if (existingLine) {
        if (stock !== undefined && existingLine.quantity + 1 > stock) {
          toast.error("Maximum available stock reached.");
          return;
        }

        existingLine.quantity += 1;

        state.totalQuantity += 1;
        state.totalAmount += existingLine.price;

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

    incrementQuantity: (
      state,
      action: PayloadAction<{ id: string; sizeId?: string; colorId?: string }>
    ) => {
      const existingLine = state.product.find((item) =>
        isSameLine(item, action.payload.id, action.payload.sizeId, action.payload.colorId)
      );

      if (existingLine) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const stock = (existingLine as any).stock as number | undefined;
        if (stock !== undefined && existingLine.quantity + 1 > stock) {
          toast.error("Maximum available stock reached.");
          return;
        }

        existingLine.quantity += 1;
        state.totalQuantity += 1;
        state.totalAmount += existingLine.price;

        toast.success("Quantity increased ");
      }
    },

    decrementQuantity: (
      state,
      action: PayloadAction<{ id: string; sizeId?: string; colorId?: string }>
    ) => {
      const existingLine = state.product.find((item) =>
        isSameLine(item, action.payload.id, action.payload.sizeId, action.payload.colorId)
      );

      if (!existingLine) return;

      if (existingLine.quantity > 1) {
        existingLine.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalAmount -= existingLine.price;

        toast.info("Quantity decreased ");
      } else {
        state.product = state.product.filter(
          (item) => !isSameLine(item, action.payload.id, action.payload.sizeId, action.payload.colorId)
        );

        state.totalQuantity -= 1;
        state.totalAmount -= existingLine.price;

        toast.error("Product removed from cart ");
      }
    },

    setQuantity: (
      state,
      action: PayloadAction<{ id: string; sizeId?: string; colorId?: string; quantity: number }>
    ) => {
      const existingLine = state.product.find((item) =>
        isSameLine(item, action.payload.id, action.payload.sizeId, action.payload.colorId)
      );
      if (!existingLine) return;

      // Reject non-numeric, negative, zero, or fractional input outright.
      if (!Number.isFinite(action.payload.quantity) || !Number.isInteger(action.payload.quantity) || action.payload.quantity < 1) {
        toast.error("Enter a valid quantity.");
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const stock = (existingLine as any).stock as number | undefined;
      let quantity = action.payload.quantity;
      if (stock !== undefined && quantity > stock) {
        quantity = stock;
        toast.error("Maximum available stock reached.");
      }

      const diff = quantity - existingLine.quantity;
      existingLine.quantity = quantity;
      state.totalQuantity += diff;
      state.totalAmount += diff * existingLine.price;
    },

    // Re-syncs a line's cached stock cap with a fresh server read (does not
    // change quantity unless the new stock is now lower than it).
    syncStock: (
      state,
      action: PayloadAction<{ id: string; sizeId?: string; colorId?: string; stock: number }>
    ) => {
      const existingLine = state.product.find((item) =>
        isSameLine(item, action.payload.id, action.payload.sizeId, action.payload.colorId)
      );
      if (!existingLine) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (existingLine as any).stock = action.payload.stock;

      if (existingLine.quantity > action.payload.stock) {
        const dropped = existingLine.quantity - action.payload.stock;
        state.totalQuantity -= dropped;
        state.totalAmount -= existingLine.price * dropped;

        if (action.payload.stock <= 0) {
          state.product = state.product.filter(
            (item) => !isSameLine(item, action.payload.id, action.payload.sizeId, action.payload.colorId)
          );
          toast.error("That variant is now out of stock — removed from cart.");
        } else {
          existingLine.quantity = action.payload.stock;
          toast.warning(`Stock changed — only ${action.payload.stock} available now.`);
        }
      }
    },

    removeItem: (
      state,
      action: PayloadAction<{ id: string; sizeId?: string; colorId?: string }>
    ) => {
      const existingLine = state.product.find((item) =>
        isSameLine(item, action.payload.id, action.payload.sizeId, action.payload.colorId)
      );

      if (!existingLine) return;

      state.totalQuantity -= existingLine.quantity;
      state.totalAmount -= existingLine.price * existingLine.quantity;
      state.product = state.product.filter(
        (item) => !isSameLine(item, action.payload.id, action.payload.sizeId, action.payload.colorId)
      );

      toast.error("Product removed from cart ");
    },

    // Switches an existing line to a different size/color. If that target
    // variant already exists as its own line, the two are merged (quantities
    // combined, capped at stock) instead of leaving two lines for the same
    // variant — the same "no duplicate variant lines" rule addToCart follows.
    changeVariant: (
      state,
      action: PayloadAction<{
        id: string;
        currentSizeId?: string;
        currentColorId?: string;
        sizeId?: string;
        colorId?: string;
        price: number;
        stock?: number;
      }>
    ) => {
      const { id, currentSizeId, currentColorId, sizeId, colorId, price, stock } = action.payload;
      const existingLine = state.product.find((item) => isSameLine(item, id, currentSizeId, currentColorId));
      if (!existingLine) return;

      const targetLine = state.product.find(
        (item) => item !== existingLine && isSameLine(item, id, sizeId, colorId)
      );

      if (targetLine) {
        // Merge into the line that already has this variant.
        let mergedQuantity = targetLine.quantity + existingLine.quantity;
        if (stock !== undefined && mergedQuantity > stock) {
          mergedQuantity = stock;
          toast.warning(`Only ${stock} in stock — quantity adjusted`);
        } else {
          toast.success("Cart item updated ");
        }

        state.totalAmount -= existingLine.price * existingLine.quantity;
        state.totalAmount -= targetLine.price * targetLine.quantity;
        state.totalAmount += price * mergedQuantity;
        state.totalQuantity -= existingLine.quantity + targetLine.quantity - mergedQuantity;

        targetLine.quantity = mergedQuantity;
        targetLine.price = price;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (targetLine as any).stock = stock;

        state.product = state.product.filter((item) => item !== existingLine);
        return;
      }

      state.totalAmount += (price - existingLine.price) * existingLine.quantity;
      existingLine.price = price;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (existingLine as any).sizeId = sizeId;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (existingLine as any).colorId = colorId;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (existingLine as any).stock = stock;

      if (stock !== undefined && existingLine.quantity > stock) {
        const dropped = existingLine.quantity - stock;
        state.totalQuantity -= dropped;
        state.totalAmount -= price * dropped;

        if (stock <= 0) {
          state.product = state.product.filter((item) => item !== existingLine);
          toast.error("That variant is out of stock — removed from cart");
        } else {
          existingLine.quantity = stock;
          toast.warning(`Only ${stock} in stock — quantity adjusted`);
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
