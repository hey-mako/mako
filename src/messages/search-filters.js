const fbTemplate = require('fb-message-builder');

const generateMessage = () => {
	const message = new fbTemplate.Text(
		'😊 Here are some ways to narrow your search'
	);

	return message
		.addQuickReply('Commute Time', 'FILTER:COMMUTE')
		.addQuickReply('Budget', 'FILTER:BUDGET')
		.addQuickReply('Pets', 'FILTER:PETS')
		.addQuickReply('Apartment Type', 'FILTER:TYPE')
		.get();
};

module.exports = generateMessage();
