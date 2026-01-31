import { createSlice } from "@reduxjs/toolkit";


const blockSlice = createSlice({
    name: "block",
    initialState: null,
    reducers: {
        addBlock : (state, action)=>{
            return action.payload;
        },
        removeBlock : ()=>{
            return null;
        }
    }
})

export const {addBlock, removeBlock} = blockSlice.actions;
export default blockSlice.reducer;