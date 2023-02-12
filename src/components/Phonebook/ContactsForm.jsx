import { Box } from 'components/Box';
import { FormStyled } from './Phonebook.styled';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { postContact } from 'redux/operations';
import { selectContacts } from 'redux/contacts/contacts.selectors';
import { Button, TextField } from '@mui/material';

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);

  const dispatch = useDispatch();

  const [name, setName] = useState(() => localStorage.getItem('name') ?? '');
  const changeName = event => {
    const { value } = event.target;
    localStorage.setItem('name', value);
    setName(value);
  };

  const [number, setNumber] = useState(
    () => localStorage.getItem('number') ?? ''
  );
  const changeNumber = event => {
    const { value } = event.target;
    localStorage.setItem('number', value);
    setNumber(value);
  };

  const handleSubmitForm = (event, name, number) => {
    event.preventDefault();
    //Контакт вже існує
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      clearName();
      return;
    }

    //Інакше додає новий контакт
    dispatch(postContact({ name, phone: number }));
    toast.success('Contact added successfully!');
    clearForm();
  };

  const clearForm = () => {
    setName('');
    setNumber('');
    localStorage.removeItem('name');
    localStorage.removeItem('number');
  };

  const clearName = () => {
    setName('');
    localStorage.removeItem('name');
  };

  return (
    <FormStyled onSubmit={event => handleSubmitForm(event, name, number)}>
      <Box display="flex" flexDirection="column">
        <TextField
          inputProps={{
            // inputMode: 'numeric',
            pattern:
              "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
            title:
              "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
          }}
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          type="text"
          name="name"
          required
          autoFocus
          onChange={changeName}
        />
      </Box>
      <Box display="flex" flexDirection="column">
        <TextField
          inputProps={{
            inputMode: 'numeric',
            pattern:
              '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}',
            title:
              'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
          }}
          id="number"
          label="Number"
          variant="outlined"
          value={number}
          type="tel"
          name="number"
          required
          onChange={changeNumber}
        />
      </Box>
      <Button variant="contained" type="submit">
        Add contact
      </Button>
    </FormStyled>
  );
};
