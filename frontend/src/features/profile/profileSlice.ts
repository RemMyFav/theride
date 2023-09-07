import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import profileService from "./profileService";
import ProfileData from "./ProfileData";

const initialState = {
  profile: null,
  isError: false,
  isSuccess: false,
  isLoding: false,
  message: "",
};

export const setProfile = createAsyncThunk(
  "profile/setProfile",
  async (profileData: ProfileData, thunkAPI) => {
    try {
      return await profileService.setProfile(profileData);
    } catch (error : any) {
      const message : any =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.tostring();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
    "profile/updateProfile",
    async (profileData: ProfileData, thunkAPI) => {
      try {
        return await profileService.updateProfile(profileData);
      } catch (error : any) {
        const message : any =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.tostring();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoding = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setProfile.pending, (state) => {
				state.isLoding = true;
			})
      .addCase(setProfile.fulfilled, (state, action) => {
				state.isLoding = false;
				state.isSuccess = true;
				state.profile = action.payload;
      })
      .addCase(setProfile.rejected, (state, action) => {
				state.isLoding = false;
				state.isError = true;
				state.message = action.payload;
				state.profile = null;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoding = true;
      })
        .addCase(updateProfile.fulfilled, (state, action) => {
					state.isLoding = false;
					state.isSuccess = true;
					state.profile = action.payload;
        })
        .addCase(updateProfile.rejected, (state, action) => {
					state.isLoding = false;
					state.isError = true;
					state.message = action.payload;
					state.profile = null;
        })
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
