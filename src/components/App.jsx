import { ContactForm } from './Phonebook/ContactsForm';
import { ContactList } from './Phonebook/ContactsList';
import { Filter } from './Phonebook/Filter';
import { SectionContacts, SectionPhonebook } from './Phonebook/Sections';

export const App = () => {
  return (
    <>
      <SectionPhonebook>
        <ContactForm />
      </SectionPhonebook>
      <SectionContacts>
        <Filter />
        <ContactList />
      </SectionContacts>
    </>
  );
};
