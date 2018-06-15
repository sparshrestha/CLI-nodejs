#!/usr/bin/env node

const program = require('commander');
const {prompt} = require('inquirer');

const {
	addContact,getContact,updateContact,deleteContact,getContactList
} = require('./logic');

// interactive pattern to ask users
const questions = [
	{
		type: 'input',
		name: 'firstname',
		message: 'Enter your first name: '
	},
	{
		type: 'input',
		name: 'lastname',
		message: 'your lastname: '
	},
	{
		type: 'input',
		name: 'phone',
		message: 'your phone: '
	},
	{
		type: 'input',
		name: 'email',
		message: 'your email: '
	}
]

program
	.version('0.0.1')
	.description('Contact Management System');

program
	.command('addContact')
	.alias('a')
	.description('Add Contact')
	.action(() =>{
		prompt(questions).then((answers) =>
		addContact(answers));
	});

program
	.command('getContact <name>')
	.alias('r')
	.description('Get Contact')
	.action(name => getContact(name));

program
	.command('updateContact <_id>')
	.alias('u')
	.description('Update Contact')
	.action(_id => {
		prompt(questions).then((answers) =>
		updateContact(_id, answers));
	});

program
	.command('deleteContact <_id>')
	.alias('d')
	.description('Delete Contact')
	.action(_id => deleteContact(_id));

program
	.command('getContactList')
	.alias('l')
	.description('Get Contact List')
	.action(() => getContactList());

if(!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))){
	program.outputHelp;
	process.exit();
}

program.parse(process.argv);