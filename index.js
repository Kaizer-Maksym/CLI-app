const { program } = require('commander');
const contacts = require('./contacts');

program
  .option('-a, --action <type>')
  .option('-i, --id <type>')
  .option('-n, --name <type>')
  .option('-e, --email <type>')
  .option('-p, --phone <type>');

program.parse();
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case 'get':
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

const start = async argv => {
  try {
    await invokeAction(argv);
  } catch (error) {
    console.log(error);
  }
};
start(argv);
