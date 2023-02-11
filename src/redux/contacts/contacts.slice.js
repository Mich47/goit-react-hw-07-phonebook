const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    fetchingInProgress(state) {
      state.isLoading = true;
    },
    fetchingSuccess(state, { payload }) {
      state.isLoading = false;
      state.error = null;
      state.items = payload;
    },
    fetchingError(state, { payload }) {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const {
  // addContact,
  // removeContact,
  fetchingInProgress,
  fetchingSuccess,
  fetchingError,
} = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
