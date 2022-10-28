import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  selectVisualContacts,
  selectIsLoading,
} from 'redux/contacts/selectors';

import { deleteContact } from 'redux/contacts/operations';

import { List, ContactItem, DeleteButton } from './ContactList.styled';
import icon from '../../images/addressBook.svg';

export const ContactList = () => {
  const isLoading = useSelector(selectIsLoading);
  const visualContacts = useSelector(selectVisualContacts);
  const dispatch = useDispatch();

  const handleClick = contactId => {
    dispatch(deleteContact(contactId));
    if (!isLoading) {
      toast.warn(`Contact deleted!`);
    }
  };

  return (
    <List>
      {visualContacts.map(({ name, phone, id }) => (
        <ContactItem key={id}>
          <img src={icon} alt="Icon" width="24" height="24" />
          <p>
            {name}: {phone}
          </p>
          <DeleteButton
            disabled={isLoading}
            type="button"
            onClick={() => {
              handleClick(id);
            }}
          >
            Delete
          </DeleteButton>
        </ContactItem>
      ))}
    </List>
  );
};
