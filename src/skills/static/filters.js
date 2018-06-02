const messages = require('../../messages');
const commute = require('./partials/commute');

const budgetHandler = (bot, message) => {
	bot.reply(message, 'budget set');
};

const petsHandler = (bot, message) => {
	bot.reply(message, 'budget set');
};

const typeHandler = (bot, message) => {
	bot.reply(message, 'budget set');
};

module.exports = controller => {
	controller.hears(
		'filters',
		['facebook_postback', 'message_received'],
		(bot, message) => {
			bot.reply(message, messages.searchFilters);
		}
	);

	commute.load(controller);

	controller.hears('FILTER:COMMUTE', 'facebook_quick_reply', commute.handler);
	controller.hears('FILTER:BUDGET', 'facebook_quick_reply', budgetHandler);
	controller.hears('FILTER:PETS', 'facebook_quick_reply', petsHandler);
	controller.hears('FILTER:BUDGET', 'facebook_quick_reply', budgetHandler);
	controller.hears('FILTER:TYPE', 'facebook_quick_reply', typeHandler);
};
