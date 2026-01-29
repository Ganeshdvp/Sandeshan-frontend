import { createSlice } from "@reduxjs/toolkit";


const friendsSlice = createSlice({
    name: "friends",
    initialState: null,
    reducers: {
        addFriend : (state, action)=>{
            return action.payload;
        },
        removeFriend : ()=>{
            return null;
        }
    }
})

export const {addFriend, removeFriend} = friendsSlice.actions;
export default friendsSlice.reducer;