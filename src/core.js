/** Hard Coded - Core Functionalities */
const messages = require('./messages');

module.exports = controller => {
	const handleOnboard = (bot, message) => {
		bot.reply(message, messages.onboard);
	};
	controller.on('facebook_optin', handleOnboard);
	controller.hears('GET_STARTED', 'facebook_postback', handleOnboard);
};
