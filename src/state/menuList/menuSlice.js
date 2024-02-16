import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null,
    orders: [],
}

export const authSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
      setLogIn: (state, action) => {
        state.user = action.payload;
        state.token = action.payload;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
        setOrders: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.orders.find((item) => item._id === newItem._id);
            if (existingItem) {
                // If the item already exists in the cart, update the quantity
                existingItem.quantity += newItem.quantity;
              } else {
                // If the item doesn't exist, add it to the cart
                state.orders.push(newItem);
              }
        },
        incrementItem: (state, action) => {
            const itemId = action.payload;
            const item = state.orders.find((item) => item._id === itemId);
            if (item) {
              item.quantity += 1;
            }
          },
        removeItem: (state, action) => {
            const itemId = action.payload;
            const item = state.orders.find((item) => item._id === itemId);
            const updatedOrders = [...state.orders];
            const itemIndex = state.orders.findIndex((item) => item._id === itemId);
            if (item) {
              updatedOrders.splice(itemIndex, 1);

              const newState = {
               ...state,
               orders: updatedOrders,
             };
       
             return newState;
            }
          },
          reset: (state) => {
            state.orders = [],
            state.quantity = 0,
            state.total = 0
        }
    }
})

export const { setOrders, removeItem, reset, setLogIn, setLogout } = authSlice.actions;

export default authSlice.reducer;