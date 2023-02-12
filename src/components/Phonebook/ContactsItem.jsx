import { PropTypes } from 'prop-types';
import { Box } from 'components/Box';
import { ContactsItemStyled, TextStyled } from './Phonebook.styled';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import LoadingButton from '@mui/lab/LoadingButton';
import { toast } from 'react-toastify';

export const ContactsItem = ({ id, name, phone }) => {
  const dispatch = useDispatch();

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
    toast.success('Contact deleted!');
  };

  return (
    <ContactsItemStyled>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <TextStyled>
          {name}: {phone}
        </TextStyled>
        <LoadingButton
          size="small"
          loading={false}
          loadingPosition="start"
          startIcon={<DeleteForeverIcon />}
          variant="contained"
          onClick={() => {
            handleDeleteContact(id);
          }}
        >
          <span>Delete</span>
        </LoadingButton>
      </Box>
    </ContactsItemStyled>
  );
};

ContactsItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
