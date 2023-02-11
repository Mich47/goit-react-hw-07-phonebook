import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/operations';
import { ContactsItem } from './ContactsItem';
import { ContactsListStyled } from './Phonebook.styled';

export const ContactList = () => {
  const contacts = useSelector(state => state.contacts.items);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const filter = useSelector(state => state.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteContact = id => dispatch(deleteContact(id));

  const handleFilterContacts = query =>
    contacts.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase())
    );

  const renderContacts = filter ? handleFilterContacts(filter) : contacts;
  // console.log('renderContacts ', renderContacts);
  return (
    <>
      {!isLoading && (
        <ContactsListStyled>
          {renderContacts.map(({ id, name, phone }) => (
            <ContactsItem
              key={id}
              name={name}
              phone={phone}
              onDelete={() => {
                handleDeleteContact(id);
              }}
            ></ContactsItem>
          ))}
        </ContactsListStyled>
      )}
    </>
  );
};
