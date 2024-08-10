import React, { useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { useLocation } from 'react-router-dom';

const Contact: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="w-[100%] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Manager</h1>
      <button
        className="bg-green-500 text-white p-2 mb-4"
        onClick={() => setIsAdding(!isAdding)}
      >
        {isAdding ? 'Cancel' : 'Add New Contact'}
      </button>
      {isAdding && <ContactForm onSave={() => setIsAdding(false)} />}
      <ContactList />
    </div>
  );
};

export default Contact;
