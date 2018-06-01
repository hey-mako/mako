const path = require('path');
const fs = require('fs');
const Botkit = require('botkit');
const nlp = require('./libs/nlp');

/* eslint-disable camelcase */
const configs = {
	access_token: process.env.ACCESS_TOKEN,
	verify_token: process.env.VERIFY_TOKEN,
};

if (process.env.NODE_ENV !== 'production') {
	configs.debug = true;
	configs.log = true;
}

const controller = Botkit.facebookbot(configs);
const bot = controller.spawn({});

// Load bot profile settings
require('./profile')(controller);
require('./core')(controller);

controller.setupWebserver(process.env.PORT, err => {
	if (err !== null) {
		throw err;
	}
	controller.createWebhookEndpoints(controller.webserver, bot, () => {
		console.log('Listening on port: ' + process.env.PORT);
	});
});

// Dynamically load skills
const skills = {};
const normalizedPath = path.join(__dirname, 'skills', 'dynamic');
fs.readdirSync(normalizedPath).forEach(file => {
	const fileName = file.slice(0, -3);
	skills[fileName] = require(path.join(normalizedPath, file));
});

// Catch all to be processed for NLP
controller.hears('.*', 'message_received', (bot, message) => {
	console.log(JSON.stringify(message));
	console.log(message.payload);
	const errorReply = () =>
		bot.reply(
			message,
			'Unfamiliar with what you are asking, try again in a different way.'
		);

	if (message.nlp) {
		controller.debug(
			`Processing NLP message intent ${message.nlp.entities.intent}`
		);
		const processNLP = nlp.load(skills);
		try {
			processNLP(bot, message);
		} catch (error) {
			controller.debug(error);
			errorReply();
		}
	} else {
		errorReply();
	}
});

// Load Middlewares
require('./middlewares/quick-reply')(controller);