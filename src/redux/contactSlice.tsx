import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
}

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { addContact, updateContact, deleteContact } = contactSlice.actions;

export const selectContactByEmail = (state: ContactsState, email: string) =>
  state.contacts.find(contact => contact.email === email);

export default contactSlice.reducer;
