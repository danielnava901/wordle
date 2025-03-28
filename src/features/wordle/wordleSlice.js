import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  completed: [],
  total: 0,
  streak: 0,
};

const wordleSlice = createSlice({
  name: "wordle",
  initialState,
  reducers: {
    addCompleted: (state, action) => {
      state.completed.push(action.payload);
    },
    updateStreak: (state, action) => {
      if (action.payload.result === "win") {
        state.total += 1;
        state.streak += 1;
      } else if (action.payload.result === "lose") {
        state.total -= 1;
        state.streak = 0;
      }
    },
  },
});

export const { addCompleted, updateStreak } = wordleSlice.actions;
export default wordleSlice.reducer;
