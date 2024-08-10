import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { deleteContact } from '../../redux/contactSlice';
import ContactForm from './ContactForm';

const ContactList: React.FC = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();
  const [selectedContact, setSelectedContact] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setSelectedContact(id);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteContact(id));
    if (selectedContact === id) {
      setSelectedContact(null); // Close the form if the contact being deleted is currently selected
    }
  };

  return (
    <div>
      {contacts.map(contact => (
        <React.Fragment key={contact.id}>
          <div className="p-4 border mb-2 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{contact.name}</h3>
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
              <p>{contact.address}</p>
              <p>{contact.company}</p>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1"
                onClick={() => handleEdit(contact.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1"
                onClick={() => handleDelete(contact.id)}
              >
                Delete
              </button>
            </div>
          </div>
          {selectedContact === contact.id && (
            <ContactForm
              contact={contact}
              onSave={() => setSelectedContact(null)}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ContactList;
