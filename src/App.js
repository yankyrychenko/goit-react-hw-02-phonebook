import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: uuidv4(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: uuidv4(), name: 'Hermione Kline', number: '443-89-12' },
      { id: uuidv4(), name: 'Eden Clements', number: '645-17-79' },
      { id: uuidv4(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = contact => {
    if (
      this.state.contacts.map(contact => contact.name).includes(contact.name)
    ) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  findContact = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  getVisibleContacts = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase()),
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.findContact} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}

export default App;
