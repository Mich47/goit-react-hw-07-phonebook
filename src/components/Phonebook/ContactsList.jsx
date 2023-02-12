import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectFilteredContacts,
  selectIsLoading,
} from 'redux/contacts/contacts.selectors';
import { fetchContacts } from 'redux/operations';
import { ContactsItem } from './ContactsItem';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ContactsListStyled, TextStyled } from './Phonebook.styled';

export const ContactList = () => {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filteredContacts = useSelector(selectFilteredContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}

      {!isLoading && !error && (
        <ContactsListStyled>
          {filteredContacts.map(({ id, name, phone }) => (
            <ContactsItem
              key={id}
              id={id}
              name={name}
              phone={phone}
            ></ContactsItem>
          ))}
        </ContactsListStyled>
      )}
      {error && (
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: [2] }}>
          <TextStyled>Oops! Something went wrong. Please try again.</TextStyled>
        </Box>
      )}
    </>
  );
};
