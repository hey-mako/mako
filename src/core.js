/** Hard Coded - Core Functionalities */
const path = require('path');
const fs = require('fs');
const messages = require('./messages');

module.exports = controller => {
	const handleOnboard = (bot, message) => {
		bot.reply(message, messages.onboard);
	};
	controller.on('facebook_optin', handleOnboard);
	controller.hears('GET_STARTED', 'facebook_postback', handleOnboard);

	// Attach static skills
	const normalizedPath = path.join(__dirname, 'skills', 'static');
	fs.readdirSync(normalizedPath).forEach(file => {
		const staticSkill = require(path.join(normalizedPath, file));
		staticSkill(controller);
	});
};
