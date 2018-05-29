const fbTemplate = require('fb-message-builder');

const SET_ADDRESS = 'COMMUTE:SET_ADDRESS';
const INCORRECT_ADDRESS = 'COMMUTE:INCORRECT_ADDRESS';

const commuteHandler = (bot, message) => {
	bot.startConversation(message, (err, convo) => {
		convo.addQuestion(
			'Where do you commute to?',
			(response, convo) => convo.gotoThread('ADDRESS_CHECK'),
			{key: 'rawCommuteAddress'},
			'default'
		);

		convo.beforeThread('ADDRESS_CHECK', (convo, next) => {
			const rawAddress = convo.extractResponse('rawCommuteAddress');
			const suggestedAddress = 'Nada';

			if (rawAddress) {
				const message = new fbTemplate.Text(
					`Is this address right? \n ${suggestedAddress}`
				);
				message
					.addQuickReply('Yup', `${SET_ADDRESS}::${suggestedAddress}`)
					.addQuickReply('No', INCORRECT_ADDRESS);

				convo.say(message);
			}
			next();
		});
	});
};

const load = controller => {
	controller.hears(INCORRECT_ADDRESS, 'message_received', (bot, message) => {
		bot.say(
			message,
			'😲 Looks like we are having troubles trying to find the correct commute address. Please try again later'
		);
	});

	controller.hears(SET_ADDRESS, 'message_received', (bot, message) => {
		bot.say(message, ` ✅ Got it! ${message.text}`);
	});
};

module.exports = {
	handler: commuteHandler,
	load,
};
