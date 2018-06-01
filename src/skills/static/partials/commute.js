const fbTemplate = require('fb-message-builder');
const {extractPayloadData} = require('../../../libs/helpers');

const SET_COMMUTE_TYPE = 'COMMUTE:SET_COMMUTE_TYPE';
const SET_COMMUTE_TIME = 'COMMUTE:SET_COMMUTE_TIME';

const commuteHandler = (bot, message) => {
	bot.startConversation(message, (err, convo) => {
		convo.addQuestion(
			'Where do you commute to?',
			(response, convo) => convo.gotoThread('VALID_ADDRESS'),
			{key: 'rawCommuteAddress'},
			'default'
		);

		convo.beforeThread('VALID_ADDRESS', (convo, next) => {
			const rawAddress = convo.extractResponse('rawCommuteAddress');
			const suggestedAddress = rawAddress;

			// Add address check here
			if (suggestedAddress) {
				convo.setVar('commuteAddress', '[VALIDATED ADDRESS]');
				next();
			} else {
				convo.setVar('error', err);
				convo.gotoThread('ERROR');
				next(err);
			}
		});

		const validAddressReply = new fbTemplate.Text(
			"👍🏼 Sweet, I'll remember: {{vars.commuteAddress}}, how do you plan on commuting?"
		)
			.addQuickReply('🚴 Bike', `${SET_COMMUTE_TYPE}::BIKE`)
			.addQuickReply('🚶 Walk', `${SET_COMMUTE_TYPE}::WALK`)
			.addQuickReply('🚗 Driving', `${SET_COMMUTE_TYPE}::DRIVE`)
			.addQuickReply(
				'🚌 Public Transportation',
				`${SET_COMMUTE_TYPE}::PUBLIC_TRANSPORTATION`
			)
			.get();

		convo.addMessage(validAddressReply, 'VALID_ADDRESS');
		convo.addMessage(
			{
				text:
					'😲 Looks like we are having troubles trying to find the correct commute address. Please try again or another address.',
			},
			'ERROR'
		);
	});
};

const load = controller => {
	controller.hears(SET_COMMUTE_TYPE, 'facebook_quick_reply', (bot, message) => {
		// Will use this when database is available
		// const commuteType = extractPayloadData(message.payload);
		const timeReply = new fbTemplate.Text(`What's the max commute time?`)
			.addQuickReply('10 Mins', `${SET_COMMUTE_TIME}::10`)
			.addQuickReply('30 Mins', `${SET_COMMUTE_TIME}::30`)
			.addQuickReply('45 Mins', `${SET_COMMUTE_TIME}::45`)
			.addQuickReply('1 Hour', `${SET_COMMUTE_TIME}::60`)
			.addQuickReply('1:30 Hours', `${SET_COMMUTE_TIME}::90`)
			.get();
		bot.reply(message, timeReply);
	});

	controller.hears(SET_COMMUTE_TIME, 'facebook_quick_reply', (bot, message) => {
		const commuteTime = extractPayloadData(message.payload);
		bot.reply(message, `Saved! ${commuteTime}`);
	});
};

module.exports = {
	handler: commuteHandler,
	load,
};
