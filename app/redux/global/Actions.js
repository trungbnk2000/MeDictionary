import * as requestFromServer from './Crud';
import { globalSlice, callTypes } from './Slice';
import store from '../store';
import { createNextState } from '@reduxjs/toolkit';

const { actions } = globalSlice;

  export const setBookmarks = data => dispatch => {
    return dispatch(actions.setBookmarks(data));
  };
  export const removeBookmarkIndex = index => dispatch => {
    return dispatch(actions.removeBookmarkIndex(index));
  };
  export const addBookmarkItem = newItem => dispatch => {
    return dispatch(actions.addBookmarkItem(newItem));
  };
  export const setPrescription = data => dispatch => {
    return dispatch(actions.setPrescription(data));
  };
  export const removePrescriptionIndex = index => dispatch => {
    return dispatch(actions.removePrescriptionIndex(index));
  };
  export const addPrescriptionItem = newItem => dispatch => {
    return dispatch(actions.addPrescriptionItem(newItem));
  };
  export const updatePrescription = (index, drugList) => dispatch => {
    return dispatch(actions.updatePrescription(index, drugList));
  }
  export const addMedicalBoxItem = newItem => dispatch => {
    return dispatch(actions.addMedicalBoxItem(newItem));
  };
  export const removeMedicalBoxIndex = index => dispatch => {
    return dispatch(actions.removeMedicalBoxIndex(index));
  };
  export const setRandom = () => (dispatch) => {
    dispatch(actions.setRandom());
  };
  export const addDrugPrescription = (drug) => dispatch => {
    return dispatch(actions.addDrugPrescription(drug));
  }