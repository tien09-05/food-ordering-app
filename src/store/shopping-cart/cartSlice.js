import { createSlice } from "@reduxjs/toolkit";

// const items =
//   localStorage.getItem("cartItems") !== null
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [];

// const totalAmount =
//   localStorage.getItem("totalAmount") !== null
//     ? JSON.parse(localStorage.getItem("totalAmount"))
//     : 0;

// const totalQuantity =
//   localStorage.getItem("totalQuantity") !== null
//     ? JSON.parse(localStorage.getItem("totalQuantity"))
//     : 0;

// const setItemFunc = (item, totalAmount, totalQuantity) => {
//   localStorage.setItem("cartItems", JSON.stringify(item));
//   localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
//   localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
// };

// const initialState = {
//   cartItems: items,
//   totalQuantity: totalQuantity,
//   totalAmount: totalAmount,
// };
const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          title: newItem.title,
          image01: newItem.image01,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      //   setItemFunc(
      //     state.cartItems.map((item) => item),
      //     state.totalAmount,
      //     state.totalQuantity
      //   );
    },

    deleteItem(state, action) {
      const id = action.payload;
      const indexExistingItem = state.cartItems.findIndex(
        (item) => item.id === id
      );

      const totalPriceExistingItem =
        state.cartItems[indexExistingItem].price *
        state.cartItems[indexExistingItem].quantity;

      state.totalAmount = state.totalAmount - totalPriceExistingItem;
      state.totalQuantity =
        state.totalQuantity - state.cartItems[indexExistingItem].quantity;

      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },

    incrementItem(state, action) {
      const id = action.payload;
      const indexExistingItem = state.cartItems.findIndex(
        (item) => item.id === id
      );

      state.cartItems[indexExistingItem].quantity++;
      state.totalAmount =
        state.totalAmount + state.cartItems[indexExistingItem].price;
      state.totalQuantity++;
    },

    decreaseItem(state, action) {
      const id = action.payload;
      const indexExistingItem = state.cartItems.findIndex(
        (item) => item.id === id
      );

      state.totalAmount =
        state.totalAmount - state.cartItems[indexExistingItem].price;
      state.totalQuantity--;

      if (state.cartItems[indexExistingItem].quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        state.cartItems[indexExistingItem].quantity--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
