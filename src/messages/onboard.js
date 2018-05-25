const fbTemplate = require('fb-message-builder');

const generateMessage = () => {
	const message = new fbTemplate.Generic();
	return message
		.addBubble(
			'Hello!',
			"I'm Mako, here to help you with your housing search, safely and quickly."
		)
		.addImage('https://i.imgur.com/2E3OEpc.png')
		.addButton('Search', 'SEARCH')
		.addBubble('New Listing', 'LISTER')
		.addBubble('Subscriptions', 'SUBSCRIPTIONS');
};

module.exports = generateMessage();
