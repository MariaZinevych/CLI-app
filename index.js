const Contacts = require("./contacts");

const { program } = require("commander");
program
  .option("-a, --action <action>", "choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "getAll":
      const contacts = await Contacts.getAll();
      return console.log(contacts);
      break;

    case "getContactById":
      const contact = await Contacts.getContactById(id);
      return console.log(contact);
      break;

    case "addContact":
      const createdContact = await Contacts.addContact({ name, email, phone });
      return console.log(createdContact);
      break;

    case "removeContact":
      const removedContact = await Contacts.removeContact(id);
      return console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
