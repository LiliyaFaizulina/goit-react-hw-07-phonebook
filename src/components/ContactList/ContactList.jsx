import { useSelector, useDispatch } from 'react-redux';
import {
  selectVisibleContacts,
  selectIsLoading,
} from 'redux/contacts/selectors';

import { deleteContact } from 'redux/contacts/operations';

import { List, ContactItem, DeleteButton } from './ContactList.styled';
import icon from '../../images/addressBook.svg';

export const ContactList = () => {
  const isLoading = useSelector(selectIsLoading);
  const visualContacts = useSelector(selectVisibleContacts);
  const dispatch = useDispatch();

  const handleClick = contactId => {
    dispatch(deleteContact(contactId));
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
