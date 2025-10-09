import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { cartStorage } from "@/utils/localStorage";

function makeItemSnapshot(product, quantity = 1) {
  return {
    id: String(product.id),
    title: product.title,
    priceCents: Math.round(product.price * 100),
    image: product.image || null,
    quantity: Number(quantity) || 1,
  };
}

const initialState = {
  itemsById: {},
  ids: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const id = String(product.id);
      if (state.itemsById[id]) {
        state.itemsById[id].quantity += Number(quantity);
      } else {
        const snapshot = makeItemSnapshot(product, quantity);
        state.itemsById[id] = snapshot;
        state.ids.push(id);
      }
    },
    removeItem: (state, action) => {
      const id = String(action.payload);
      if (state.itemsById[id]) {
        delete state.itemsById[id];
        state.ids = state.ids.filter((i) => i !== id);
      }
    },
    increaseQuantity: (state, action) => {
      const id = String(action.payload);
      if (state.itemsById[id]) state.itemsById[id].quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const id = String(action.payload);
      if (!state.itemsById[id]) return;
      state.itemsById[id].quantity -= 1;
      if (state.itemsById[id].quantity <= 0) {
        delete state.itemsById[id];
        state.ids = state.ids.filter((i) => i !== id);
      }
    },
    clearCart: (state) => {
      state.itemsById = {};
      state.ids = [];
    },
    hydrateCart: (state, action) => {
      const payload = action.payload;
      if (payload && payload.itemsById) {
        state.itemsById = payload.itemsById;
        state.ids = payload.ids || Object.keys(payload.itemsById);
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
const selectCartIds = (state) => state.cart.ids;
const selectItemsById = (state) => state.cart.itemsById;

export const selectCartItemsArray = createSelector(
  [selectCartIds, selectItemsById],
  (ids, itemsById) => ids.map((id) => itemsById[id])
);

export const selectCartTotalQuantity = createSelector(
  [selectCartItemsArray],
  (cartItems) => cartItems.reduce((acc, item) => acc + item.quantity, 0)
);

export const selectCartTotalCents = createSelector(
  [selectCartItemsArray],
  (cartItems) =>
    cartItems.reduce((acc, item) => acc + item.quantity * item.priceCents, 0)
);

export const selectCartTotalFormatted = createSelector(
  [selectCartTotalCents],
  (cents) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100)
);

export const saveCartForUser = (email, cartState) =>
  cartStorage.saveUserCart(email, cartState);
export const loadCartForUser = (email) =>
  cartStorage.getUserCart(email);
