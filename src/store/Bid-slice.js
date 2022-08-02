import { createSlice } from "@reduxjs/toolkit";

const initialBid = {
  name: null,
  price: null,
  id: null,
  email: null,
  description: null,
  productCatagory: null,
};

const BidSlice = createSlice({
  name: "Bid",
  initialState: initialBid,
  reducers: {},
});
