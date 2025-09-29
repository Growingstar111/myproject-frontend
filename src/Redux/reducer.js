import { createSlice } from "@reduxjs/toolkit";

const customers = createSlice({
  name: "customer",
  initialState: {
    details: "",
    carts: "",
    search: "",
  },
  reducers: {
    login: (state, action) => {
      state.details = action.payload;
    },

    intialCart: (state, action) => {
      state.carts = Number(action.payload);
    },

    addtoCart: (state, action) => {
      state.carts = Number(state.carts + action.payload);
    },
    removetoCart: (state, action) => {
      state.carts = Number(
        state.carts == 0 ? state.carts : state.carts - action.payload
      );
    },
    removeCart: (state, action) => {
      state.carts = action.payload;
    },
    setSearch:(state, action)=>{
      state.search = action.payload
    },
  },
});

export const {
  login,
  addtoCart,
  removeCart,
  removetoCart,
  intialCart,
  setSearch,
} = customers.actions;
export default customers.reducer;
