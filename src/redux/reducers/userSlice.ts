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

  isDrawerOpen: boolean;
  selectedUser: user | null;
  isDeleteModel: boolean;
  searchUser : string;
}

const initialState: userState = {
  userData: [],
  loading: false,
  error: null,
  isDrawerOpen: false,
  selectedUser: null,
  isDeleteModel: false,
  searchUser: "",
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

export const editSpecificUsers = createAsyncThunk(
  "user/editSpecificUsers",
  async (userPayload: user, thunkAPI) => {
    try {
      const response = await axios.put(
        `https://6aa35594e7ae868cdf7ad9e1.mockapi.io/crud/${userPayload.id}`,
        userPayload,
      );
      console.log("response", response);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to update user");
    }
  },
);

export const deleteSpecificUsers = createAsyncThunk(
  "user/deleteSpecificUsers",
  async (userPayload: user, thunkAPI) => {
    try {
      const response = await axios.delete(
        `https://6aa35594e7ae868cdf7ad9e1.mockapi.io/crud/${userPayload.id}`,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete user");
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    openEditDrawer: (state, action) => {
      state.selectedUser = action.payload; // select user for delete
      state.isDrawerOpen = true; // open Edit drawer
    },
    closeEditDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    openDeleteModel: (state, action) => {
      state.selectedUser = action.payload; // select user for delete
      state.isDeleteModel = true; // open delete drawer
    },
    closeDeleteModel: (state) => {
      state.isDeleteModel = false;
    },
    searchInputText:(state, action)=>{
      // console.log("action.payload", action.payload)
      state.searchUser = action.payload;
    },
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

    // editSpecificUsers
    builder
      .addCase(editSpecificUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editSpecificUsers.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.userData.findIndex(
          (user) => user.id === updatedUser.id,
        );

        if (index !== -1) {
          state.userData[index] = updatedUser;
        }

        state.error = null;
      })
      .addCase(editSpecificUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //deleteSpecificUsers
    builder
      .addCase(deleteSpecificUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteSpecificUsers.fulfilled, (state, action) => {
        state.loading = false;
        const deletedUser = action.payload;
        state.userData = state.userData.filter(
          (user) => user.id !== deletedUser.id,
        );
        state.error = null;
      })

      .addCase(deleteSpecificUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  openEditDrawer,
  closeEditDrawer,
  openDeleteModel,
  closeDeleteModel,
  searchInputText
} = userSlice.actions;

export default userSlice.reducer;
