const Botkit = require('botkit');

/* eslint-disable camelcase */
const controller = Botkit.facebookbot({
	access_token: process.env.ACCESS_TOKEN,
	verify_token: process.env.VERIFY_TOKEN,
	debug: true,
	log: true
});

const bot = controller.spawn({});

// Load bot profile settings
require('./profile')(controller);

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
