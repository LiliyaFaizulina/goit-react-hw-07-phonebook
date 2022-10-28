import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Form, FormButton, Label } from './ContactForm.styled';
import { addContact } from 'redux/contacts/operations';
import { selectContacts, selectIsLoading } from 'redux/contacts/selectors';

const nameCheckMessage =
  "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan";
const telCheckMessage =
  'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const handleInput = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newName = name.toLowerCase();

    if (contacts.some(contact => contact.name.toLowerCase() === newName)) {
      toast.error(`${name} is already in contacts`);
      return;
    }

    dispatch(addContact({ name, phone }));
    if (!isLoading) {
      toast.success(`${name} added in contacts`);
    }

    setName('');
    setPhone('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <input
          onChange={handleInput}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title={nameCheckMessage}
          required
        />
      </Label>
      <Label>
        Number
        <input
          onChange={handleInput}
          type="tel"
          name="phone"
          value={phone}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title={telCheckMessage}
          required
        />
      </Label>
      <FormButton type="submit">Add contact</FormButton>
    </Form>
  );
};
