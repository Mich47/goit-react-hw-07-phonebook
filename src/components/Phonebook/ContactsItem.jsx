import { PropTypes } from 'prop-types';
import { Box } from 'components/Box';
import {
  ButtonStyled,
  ContactsItemStyled,
  TextStyled,
} from './Phonebook.styled';

export const ContactsItem = ({ name, phone, onDelete }) => {
  return (
    <ContactsItemStyled>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <TextStyled>
          {name}: {phone}
        </TextStyled>
        <ButtonStyled
          fontSize="xs"
          px={4}
          py={2}
          type="button"
          onClick={onDelete}
        >
          Delete
        </ButtonStyled>
      </Box>
    </ContactsItemStyled>
  );
};

ContactsItem.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
