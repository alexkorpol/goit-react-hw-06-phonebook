import { useState } from 'react';
import { Button, Form, Input, Label, Span } from './Forma.styled';
import { nanoid } from 'nanoid'
import { Notify } from 'notiflix';
import { useSelector, useDispatch } from 'react-redux';
import { visibleContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';

export default function Forma() {
  const contacts = useSelector(visibleContacts);
  const dispatch = useDispatch();

  const INITIAL_STATE = {
  nameNew: '',
  numberNew: '',
};

  const [state, setState] = useState({
  ...INITIAL_STATE,
  });

 const { nameNew, numberNew } = state;

 const handleChange = nameValueInput => event => {
    const { target } = event;
    setState(prevState => ({ ...prevState,[nameValueInput]: target.value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    // ! ====== Add contact to state ======
    const newNameToLowerCase = nameNew.toLowerCase();
    const nameAndNumberIsExistIndex = (contacts.findIndex(({ name, number }) => (name.toLowerCase() === newNameToLowerCase && number === numberNew)))

    if (nameAndNumberIsExistIndex >= 0) {
        Notify.failure(`${contacts[nameAndNumberIsExistIndex].name} and number ${contacts[nameAndNumberIsExistIndex].number}   is already in list contacts`);
        resetForm();
        return;
    }

      const numberIsExistIndex = (contacts.findIndex(({ number }) => (number === numberNew)))
    if(numberIsExistIndex >= 0) {
        Notify.failure(`This number ${contacts[numberIsExistIndex].number} is already in list contacts ${contacts[numberIsExistIndex].name}`);
        resetForm();
        return;
    }

    const newContact = {
      id: nanoid(),
      name: nameNew,
      number: numberNew,
    };
    dispatch(addContact( newContact ))
    resetForm();
  };

  const resetForm = () => {
    setState({
        ...INITIAL_STATE,
    });
  };

      return (
      <Form  onSubmit={handleSubmit}>
        <Label htmlFor={nanoid()} >
            <Span>Name</Span>
        </Label>

          <Input
            type="text"
            placeholder="Enter name of contact"
            name="name"
            id={nanoid()}
            value={nameNew}
            onChange={handleChange('nameNew')}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />

        <Label htmlFor={nanoid()}>
          <Span>Number</Span>
        </Label>

          <Input
            type="tel"
            placeholder="Enter number of contact"
            name="number"
            id={nanoid()}
            value={numberNew}
            onChange={handleChange('numberNew')}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />

        <Button type="submit">Add contact
        </Button>
      </Form>

    )
   }






