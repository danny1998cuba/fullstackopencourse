import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

const slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilterValue(state, action) {
      return action.payload
    }
  }
})

export const { setFilterValue } = slice.actions
export default slice.reducer