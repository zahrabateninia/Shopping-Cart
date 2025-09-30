import { createSlice } from "@reduxjs/toolkit"

function makeItemSnapshot(product, quantity = 1) {
    return {
      id: String(product.id),
      title: product.title,
      priceCents: Math.round(product.price * 100), // store price in cents
      image: product.image|| null,
      quantity: Number(quantity) || 1,
    }
  }
  
  const initialState = {
    // normalized shape
    itemsById: {},
    ids: [],
  }

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItem: (state, action) => {
        const { product, quantity = 1 } = action.payload
        const id = String(product.id)
        if (state.itemsById[id]) {
          state.itemsById[id].quantity += Number(quantity)
          console.log('add to item reducer if statement')
        } else {
          const snapshot = makeItemSnapshot(product, quantity)
          state.itemsById[id] = snapshot
          state.ids.push(id)
          console.log('add to item reducer else statement')
        }
      },
  
      removeItem: (state, action) => {
        const id = String(action.payload)
        if (state.itemsById[id]) {
          delete state.itemsById[id]
          state.ids = state.ids.filter((i) => i !== id)
        }
      },
  
      increaseQuantity: (state, action) => {
        const id = String(action.payload)
        if (state.itemsById[id]) state.itemsById[id].quantity += 1
      },
  
      decreaseQuantity: (state, action) => {
        const id = String(action.payload)
        if (!state.itemsById[id]) return
        state.itemsById[id].quantity -= 1
        if (state.itemsById[id].quantity <= 0) {
          delete state.itemsById[id]
          state.ids = state.ids.filter((i) => i !== id)
        }
      },
  
      clearCart: (state) => {
        state.itemsById = {}
        state.ids = []
      },
  
      // Hydrate the cart to persist cart items across page reloads
      hydrateCart: (state, action) => {
        const payload = action.payload
        if (payload && payload.itemsById) {
          state.itemsById = payload.itemsById
          state.ids = payload.ids || Object.keys(payload.itemsById)
        }
      },
    },
  })
  
  export const { 
    addItem, 
    removeItem, 
    increaseQuantity, 
    decreaseQuantity, 
    clearCart, 
    hydrateCart 
  } = cartSlice.actions
  
  export default cartSlice.reducer

  export const selectCartItemsArray = (state) =>
    state.cart.ids.map((id) => state.cart.itemsById[id])
  
  export const selectCartTotalQuantity = (state) =>
    selectCartItemsArray(state).reduce((acc, item) => acc + item.quantity, 0)
  
  export const selectCartTotalCents = (state) =>
    selectCartItemsArray(state).reduce(
      (acc, item) => acc + item.quantity * item.priceCents,
      0
    )
  
  export const selectCartTotalFormatted = (state) => {
    const cents = selectCartTotalCents(state)
    // ex: 11997 → "$119.97"
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(cents / 100)
  }
  