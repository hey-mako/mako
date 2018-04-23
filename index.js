const Botkit = require('botkit');

/* eslint-disable camelcase */
const controller = Botkit.facebookbot({
	access_token: process.env.ACCESS_TOKEN,
	verify_token: process.env.VERIFY_TOKEN,
});

const bot = controller.spawn({});

controller.setupWebserver(process.env.PORT, err => {
	if (err !== null) {
		throw err;
	}
	controller.createWebhookEndpoints(controller.webserver, bot, () => {
		console.log('Listening on port: ' + process.env.PORT);
	});
});

controller.on('facebook_optin', (bot, message) => {
	bot.reply(message, 'Welcome to my application!');
});

controller.hears(['hello'], 'message_received', (bot, message) => {
	bot.reply(message, 'Hey there.');
});
