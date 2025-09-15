import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addItem: (state, action) => {
        const { product, quantity = 1 } = action.payload
        const id = String(product.id)
        if (state.itemsById[id]) {
          state.itemsById[id].quantity += Number(quantity)
        } else {
          const snapshot = makeItemSnapshot(product, quantity)
          state.itemsById[id] = snapshot
          state.ids.push(id)
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
  