// Shared snapshot shape dispatched to the Cart and Wishlist Redux slices
// (id/name/slug/image/price, + the selected variant for Cart). Each slice
// extends this with the one field only it needs — `quantity` for Cart,
// `wishlist` for Wishlist — on the item type it actually stores.
export interface Product {
  id: string;
  name: string;
  slug?: string;
  image?: string;
  price: number;
  sizeId?: string;
  colorId?: string;
  stock?: number;
}
