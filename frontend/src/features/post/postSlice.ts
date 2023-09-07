import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";
import QuestionData from "./QuestionData";

const initialState = {
  question: null,
  isError: false,
  isSuccess: false,
  isLoding: false,
  message: "",
};

export const setQuestion = createAsyncThunk(
  "post/setQuestion",
  async (question : QuestionData, thunkAPI) => {
    try {
      return await postService.setQuestion(question);
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

export const acceptQuestion =  createAsyncThunk(
  "post/acceptQuestion",
  async (taInfo, thunkAPI) => {
    try {
      return await postService.acceptQuestion(taInfo);
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
)

export const postSlice = createSlice({
  name: "post",
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
      .addCase(setQuestion.pending, (state) => {
      state.isLoding = true;
    })
      .addCase(setQuestion.fulfilled, (state, action) => {
	state.isLoding = false;
	state.isSuccess = true;
	state.question = action.payload;
      })
      .addCase(setQuestion.rejected, (state, action) => {
	state.isLoding = false;
	state.isError = true;
	state.message = action.payload;
	state.question = null;
      })
      .addCase(acceptQuestion.pending, (state) => {
	state.isLoding = true;
      })
      .addCase(acceptQuestion.fulfilled, (state, action) => {
	state.isLoding = false;
	state.isSuccess = true;
	state.question = action.payload;
      })
      .addCase(acceptQuestion.rejected, (state, action) => {
	state.isLoding = false;
	state.isError = true;
	state.message = action.payload;
	state.question = null;
      })
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
