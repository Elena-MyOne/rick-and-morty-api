import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CharacterData } from '../../types/CharacterData';

export interface SelectedItemsState {
  selectedItems: CharacterData[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    setSelectedItems(state, action: PayloadAction<CharacterData[]>) {
      state.selectedItems = action.payload;
    },
  },
});

export const selectSelectedItems = (state: RootState): SelectedItemsState => state.selectedItems;

export const { setSelectedItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
