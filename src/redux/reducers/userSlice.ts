import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";

export interface user{
  id?: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
}

export interface userState {
  userData: user[];
  loading: boolean;
  error : string | null;

}

const initialState: userState = {
  userData: [],
  loading: false,
  error: null,
}


export const createUser = createAsyncThunk(
  'user/createUser',
  async (userPayload:user, thunkAPI) => {
    try{
const response = await axios.post("https://6aa35594e7ae868cdf7ad9e1.mockapi.io/crud",userPayload )
console.log("response", response)   
return response.data
    }catch(error){
      return thunkAPI.rejectWithValue("Failed to create user");
    }
    
  },
)




 const userSlice = createSlice({
  name: 'user',
  initialState,
 reducers:{

 },

 extraReducers:(builder)=>{
  builder.addCase(createUser.pending, (state)=>{
    state.loading = true;
    state.error = null;
  })
  .addCase(createUser.fulfilled, (state, action)=>{
        state.loading = false;
              console.log("state.userData", state.userData)

      state.userData.push(action.payload)
  })
 .addCase(createUser.rejected, (state , action)=>{
        state.loading = false;
        state.error = action.payload as string;
  })

 }
})

export const { } = userSlice.actions

export default userSlice.reducer