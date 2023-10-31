const fs = require("fs").promises;
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "./db/db.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "UTF-8" });

  return JSON.parse(data);
}

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function getAll() {
  const contacts = await listContacts();

  return console.table(contacts);
}

async function getContactById(id) {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === id);
  if (contact === undefined) {
    return null;
  }

  return contact;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }

  const newContacts = [
    ...contacts.slice(0, index),
    ...contacts.slice(index + 1),
  ];

  await writeContacts(newContacts);

  return contacts[index];
}

async function addContact(contact) {
  const contacts = await listContacts();
  const newContact = { ...contact, id: crypto.randomUUID() };

  contacts.push(newContact);

  await writeContacts(contacts);

  return newContact;
}

module.exports = { addContact, removeContact, getContactById, getAll };
