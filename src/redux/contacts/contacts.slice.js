import { createSlice } from '@reduxjs/toolkit';
import { deleteContact, fetchContacts, postContact } from 'redux/operations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handleRejected = (state, { payload }) => {
  // state.isLoading = false;
  state.error = payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        // state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(({ id }) => id === payload.id);
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(postContact.fulfilled, (state, { payload }) => {
        // state.isLoading = false;
        state.error = null;
        state.items.push(payload);
      })
      .addCase(postContact.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
