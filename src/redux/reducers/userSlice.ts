import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface user {
  id?: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
}

export interface userState {
  userData: user[];
  loading: boolean;
  error: string | null;

  isDrawerOpen:boolean;
  selectedUser: user | null; 
}

const initialState: userState = {
  userData: [],
  loading: false,
  error: null,
  isDrawerOpen:false,
  selectedUser: null
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userPayload: user, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://6aa35594e7ae868cdf7ad9e1.mockapi.io/crud",
        userPayload,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to create user");
    }
  },
);

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://6aa35594e7ae868cdf7ad9e1.mockapi.io/crud",
      );
      // console.log("response", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch user");
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  openEditDrawer:(state,action)=>{
    console.log("action.payload", action.payload)
    state.selectedUser = action.payload;
    state.isDrawerOpen = true;
  },
  closeEditDrawer:(state)=>{
    // state.selectedUser = action.payload;
    state.isDrawerOpen = false;
  }

  },

  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("state.userData", state.userData);
        state.userData.push(action.payload);
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

// fetchUser
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {openEditDrawer, closeEditDrawer} = userSlice.actions;

export default userSlice.reducer;
