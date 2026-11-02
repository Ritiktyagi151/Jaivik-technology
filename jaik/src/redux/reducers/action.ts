import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ActionState {
  isReviewModal: boolean;
}

const initialState: ActionState = {
    isReviewModal: false,
};

export const actionSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setAction: (state, { payload }: PayloadAction<Partial<ActionState>>) => ({ ...state, ...payload }),
  },
});

export const { setAction } = actionSlice.actions;

export default actionSlice.reducer;
