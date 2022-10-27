import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  userInfo: null,
  bookmarks: [],
  medicalBox: [],
  listLoading: false,
  actionsLoading: false,
  error: null,
};
export const callTypes = {
  list: 'list',
  action: 'action',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },

    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },

    setBookmarks: (state, action) => {
      state.bookmarks = action?.payload;
    },
    removeBookmarkIndex: (state, action) => {
      var index = action?.payload;
      var temp = [...state.bookmarks];
      temp.splice(index, 1);
      state.bookmarks = temp;
    },
    addBookmarkItem: (state, action) => {
      var newItem = action?.payload;
      var temp = state.bookmarks || [];
      temp.push(newItem);
      state.bookmarks = temp;
    },
    removeMedicalBoxIndex: (state, action) => {
      var index = action?.payload;
      var temp = [...state.medicalBox];
      temp.splice(index, 1);
      state.medicalBox = temp;
    },
    addMedicalBoxItem: (state, action) => {
      var newItem = action?.payload;
      var temp = state.medicalBox || [];
      temp.push(newItem);
      state.medicalBox = temp;
    },
  },
});
