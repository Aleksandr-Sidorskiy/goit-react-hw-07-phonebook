
import { useState } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { useSelector, useDispatch } from 'react-redux';
import { addContacts, getContacts } from 'redux/contactsSlice';

import Loader from 'components/Loader';
import { useCreateContactMutation, useFechContactQuery } from 'redux/contactApi';

export const ContactFormApi = () => {
  const [createContact] = useCreateContactMutation();
  const { contact } = useFechContactQuery();
  const [inputName, setInputName] = useState('');
  const [inputPhone, setInputPhone] = useState('');


  const handleInputName = e => setInputName(e.currentTarget.value);
  const handleInputPhone = e => setInputPhone(e.currentTarget.value);
  
  const handeleSubmit = e => {
    e.preventDefault();

    const data = newData();
    if (checkContacts(data)) {
      alert(`${data.name} is already in contacts`);
      return false;
    }

    createContact(data);

    if (data) {
      setInputName('');
      setInputPhone('');
    }

    return true;
  };

  const newData = () => ({
    name: inputName,
    phone: inputPhone,
  });

  const checkContacts = phone => contact.find(({ name }) => name.toLowerCase() === phone.name.toLowerCase());

  return (
    <>
       <form className={css.form} avtocomplete="off" onSubmit={handeleSubmit}>
        <label className={css.label}>
          <span className={css.title}>Name</span>
          <input
            className={css.input}
            onChange={handleInputName}
            type="text"
            name="name"
            value={inputName}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.label}>
          <span className={css.title}>Number</span>
          <input
            className={css.input}
            onChange={handleInputPhone}
            type="tel"
            name="phone"
            value={inputPhone}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    </>
  )
};

// const ContactForm = () => {
//   const [name, setName] = useState('');
//   const [number, setNumber] = useState('');
  
//   const contacts = useSelector(getContacts);
//   const dispatch = useDispatch();
  
//   const onChangeName = e => {
//     setName(e.currentTarget.value);
//   };

//   const onChangeNumber = e => {
//     setNumber(e.currentTarget.value);
//   }
  
//   const onSubmitForm = e => {
//     e.preventDefault();
    
//     const newContact = { id: nanoid(), name, number };
    
//     contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
//     ? Report.warning(
//       `${name}`,
//               'This user is already in the contact list.',
//               'OK'
//               )
//               : dispatch(addContacts(newContact));
//               reset(); 
//             };
            
//             const reset = () => {
//               setName('');
//               setNumber('');
//             };
            
//             return (
//               <form className={css.form} onSubmit={onSubmitForm}>
//         <label className={css.label}>
//           <span className={css.title}>Name</span>
//           <input
//             className={css.input}
//             onChange={onChangeName}
//             type="text"
//             name="name"
//             value={name}
//             pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//           />
//         </label>
//         <label className={css.label}>
//           <span className={css.title}>Number</span>
//           <input
//             className={css.input}
//             onChange={onChangeNumber}
//             type="tel"
//             name="number"
//             value={number}
//             pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//           />
//         </label>
//         <button className={css.button} type="submit">
//           Add contact
//         </button>
//       </form>
//     );
    
//   }
  

  
//   export default ContactForm;
