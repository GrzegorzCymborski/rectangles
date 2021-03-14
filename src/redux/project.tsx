import { createSlice } from '@reduxjs/toolkit';

export type Item = {
  id: string;
  color: string;
  rotation: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

type Project = {
  id: string;
  name: string;
  width: number;
  height: number;
  items: Item[];
};

type Initial = Project & { modified: number };

export type InitialStateProps = {
  fetchedData: null | Initial;
};

const initialState: InitialStateProps = {
  fetchedData: null,
};

export const counterSlice = createSlice({
  name: 'project data',
  initialState,
  reducers: {
    getData: (state, action) => {
      state.fetchedData = action.payload;
    },
  },
});

export const { getData } = counterSlice.actions;
export default counterSlice.reducer;
