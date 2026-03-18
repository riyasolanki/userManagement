import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ limit, skip }: any, { rejectWithValue }) => {
    try {
      const response = await api.get(`users?limit=${limit}&skip=${skip}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "API Error");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    limit: 10,
    skip: 0,
    total: 0,
  } as any,

  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    resetUsers: (state) => {
      state.users = [];
      state.skip = 0;
    },

    addUser: (state, action) => {
      // Logic: Add new user to the top of the list
      state.users.unshift(action.payload);
    },

    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload; 
      }
    },

    // Removed editUser to keep it DRY (Don't Repeat Yourself)
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      const newUsers = action.payload.users.filter(
        (newUser: any) => !state.users.some((u: any) => u.id === newUser.id)
      );
      state.users = [...state.users, ...newUsers];
      state.skip += state.limit;
      state.total = action.payload.total;
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {
  addUser,
  setUsers,
  resetUsers,
  updateUser
} = userSlice.actions;

export default userSlice.reducer;