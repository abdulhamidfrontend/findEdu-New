// src/redux/languageSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  lang: string;
}

const initialState: LanguageState = {
  lang: "uz",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
  },
});

export const { setLang } = languageSlice.actions;
export default languageSlice.reducer;
