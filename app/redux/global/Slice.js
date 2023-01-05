import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: '',
  userInfo: null,
  bookmarks: [],
  medicalBox: [],
  prescription: [],
  listLoading: false,
  actionsLoading: false,
  error: null,
  random: 0,
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
    setRandom: (state, action) => {
      state.random = Math.random();
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    setPrescription: (state, action) => {
      state.prescription = action?.payload;
    },
    removePrescriptionIndex: (state, action) => {
      var index = action?.payload;
      var temp = [...state.prescription];
      temp.splice(index, 1);
      state.prescription = temp;
    },
    addPrescriptionItem: (state, action) => {
      var newItem = action?.payload;
      var temp = state.prescription || [];
      temp.push(newItem);
      state.prescription = temp;
    },
    updatePrescription: (state, action) => {
      var index = action?.payload.index;
      var temp = [...state.prescription];
      temp[index].drugList = action?.payload.drugList;
      state.prescription = temp;
    },
    addDrugPrescription: (state, action) => {
      var drug = action?.payload.drug;
      var prescriptionIndex = action?.payload.index;
      var temp = [...state.prescription];
      temp[prescriptionIndex]?.drugList.push(drug);
      state.prescription = temp;
    },
    updateDrugPrescription: (state, action) => {
      var drug = action?.payload.drug;
      var prescriptionIndex = action?.payload.index;
      var temp = [...state.prescription];
      temp[prescriptionIndex]?.drugList.map((item, index) => {
        if(item.id === drug.id){
          item.unit = drug.unit;
          item.perDay = drug.perDay;
        }
      })
      state.prescription = temp;
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
