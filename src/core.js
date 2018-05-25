/** Hard Coded - Core Functionalities */
const messages = require('./messages');

module.exports = controller => {
	const handleOnboard = (bot, message) => {
		console.log(messages.onboard);
		bot.reply(message, messages.onboard);
	}
	controller.on('facebook_optin', handleOnboard);
	controller.hears('GET_STARTED', 'facebook_postback', handleOnboard);

	controller.hears(['hello'], 'message_received', (bot, message) => {
		bot.reply(message, 'Hey there.');
	});
};
