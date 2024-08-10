import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { RootState } from '../../redux/store';
import { addContact, selectContactByEmail, updateContact } from '../../redux/contactSlice';

interface ContactFormProps {
  contact?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    company: string;
  };
  onSave: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ contact, onSave }) => {
  const [name, setName] = useState(contact?.name || '');
  const [email, setEmail] = useState(contact?.email || '');
  const [phone, setPhone] = useState(contact?.phone || '');
  const [address, setAddress] = useState(contact?.address || '');
  const [company, setCompany] = useState(contact?.company || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const dispatch = useDispatch();
  const existingContact = useSelector((state: RootState) => selectContactByEmail(state.contacts, email));

  const validate = () => {
    let isValid = true;
    if (!name.trim()) {
      setNameError('Name is required.');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    } else {
      setEmailError('');
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (!validate()) {
      return;
    }

    if (existingContact && (!contact || existingContact.id !== contact.id)) {
      setErrorMessage('This email is already present. Would you like to modify the contact instead?');
    } else {
      if (contact) {
        dispatch(updateContact({ ...contact, name, email, phone, address, company }));
      } else {
        dispatch(addContact({ id: nanoid(), name, email, phone, address, company }));
      }
      onSave();
    }
  };

  const handleEditExisting = () => {
    if (existingContact) {
      dispatch(updateContact({ ...existingContact, name, phone, address, company }));
      onSave();
    }
  };

  return (
    <div className="p-4">
      <input
        className="border p-2 mb-1 w-full"
        type="text"
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      {nameError && <p className="text-red-500">{nameError}</p>}
      
      <input
        className="border p-2 mb-2 w-full"
        type="email"
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      {emailError && <p className="text-red-500">{emailError}</p>}
      
      <input
        className="border p-2 mb-2 w-full"
        type="text"
        value={phone}
        placeholder="Phone"
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        type="text"
        value={address}
        placeholder="Address"
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        type="text"
        value={company}
        placeholder="Company"
        onChange={(e) => setCompany(e.target.value)}
      />
      {errorMessage && (
        <div className="text-red-500 mb-2">
          {errorMessage}
          <button
            className="ml-2 underline text-blue-500"
            onClick={handleEditExisting}
          >
            Modify Contact
          </button>
        </div>
      )}
      <button
        className="bg-blue-500 text-white p-2 w-full"
        onClick={handleSubmit}
      >
        {contact ? 'Update Contact' : 'Add Contact'}
      </button>
    </div>
  );
};

export default ContactForm;
