const messages = require('../../messages');
const commute = require('./partials/commute');

const budgetHandler = (bot, message) => {

};

const petsHandler = (bot, message) => {

};

const typeHandler = (bot, message) => {

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

	controller.hears('FILTER:COMMUTE', 'facebook_postback', commute.handler);
	controller.hears('FILTER:BUDGET', 'facebook_postback', budgetHandler);
	controller.hears('FILTER:PETS', 'facebook_postback', petsHandler);
	controller.hears('FILTER:BUDGET', 'facebook_postback', budgetHandler);
	controller.hears('FILTER:TYPE', 'facebook_postback', typeHandler);
};
