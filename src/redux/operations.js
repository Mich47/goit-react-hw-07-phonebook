import axios from 'axios';
import {
  fetchingError,
  fetchingInProgress,
  fetchingSuccess,
} from './contacts/contacts.slice';

axios.defaults.baseURL = 'https://63e7d624cbdc5658737e62f9.mockapi.io';

export const fetchContacts = () => async dispatch => {
  dispatch(fetchingInProgress());
  try {
    const { data } = await axios.get('/contacts');
    dispatch(fetchingSuccess(data));
  } catch (error) {
    dispatch(fetchingError(error));
  }
};

export const postContact = (name, phone) => async dispatch => {
  try {
    await axios.post('/contacts', { name, phone });
    // console.log('responsePost ', data);

    dispatch(fetchContacts());
  } catch (error) {
    dispatch(fetchingError(error));
  }
};

export const deleteContact = id => async dispatch => {
  try {
    await axios.delete(`/contacts/${id}`);
    // console.log('responsePost ', data);

    dispatch(fetchContacts());
  } catch (error) {
    dispatch(fetchingError(error));
  }
};
