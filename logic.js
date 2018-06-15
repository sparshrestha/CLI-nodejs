const mongoose = require('mongoose');
const assert = require('assert');
mongoose.promise = global.promise; // allows to use native promises without throwing error.

mongoose.connect('mongodb://localhost:27017/contact-manager');
const db = mongoose.connection;

function toLower(value){
	return value.toLowerCase();
};	//converting values to lowercases.

//defining a contact schema

const contactSchema = mongoose.Schema({
	firstname: {type: String, set: toLower},
	lastname: {type: String, set: toLower},
	phone: {type: String, set: toLower},
	email: {type: String, set: toLower}
});

//define model as an interface with the database

const Contact = mongoose.model('Contact', contactSchema);

const addContact = (contact) => {
	Contact.create(contact, (err) => {
		assert.equal(null,err);
		console.info("New Contact Added");
		db.close();
	});
};

const getContact = (name) => {
	//search criteria - case-insensitive.
	const search = new RegExp(name,'i');

	Contact.find({$or: [ {firstname: search},{lastname: search} ] })
	.exec ((err, contact) => {
		assert.equal(null,err);
		console.info(contact);
		console.info(`${contact.length} matches`);
		db.close();
	});
};

const updateContact = (_id, contact) => {
	Contact.update({ _id}, contact)
	.exec((err, status)=>{
		assert.equal(null,err);
		console.info('Contact Update Success');
		db.close();
	});
};

const deleteContact = (_id) =>{
	Contact.remove({_id})
	.exec((err,status)=>{
		assert.equal(null,err);
		console.info('Delete Success');
		db.close();
	});
};

const getContactList = () =>{
	Contact.find()
	.exec((err, contacts) => {
		assert.equal(null,err);
		console.info(contacts);
		console.info(`${contacts.length} matches`);
		db.close();
	});
};
// export all modules
module.exports = {addContact, getContact, updateContact, deleteContact, getContactList};