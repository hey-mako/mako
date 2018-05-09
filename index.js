const Botkit = require('botkit');
const bodyParser = require('body-parser');

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

	const webserver = controller.webserver;

	if (process.env.deployIn === 'review') {
		// Only allow the test user created to run through these requests
		webserver.use(bodyParser.json({verify: verifyTestUser}));
	}

	controller.createWebhookEndpoints(controller.webserver, bot, () => {
		console.log('Listening on port: ' + process.env.PORT);
	});
});

controller.on('facebook_optin', (bot, message) => {
	bot.reply(message, 'Welcome to my application!');
});

controller.hears('howdy', 'message_received', (bot, message) => {
	bot.reply(message, 'Yee Ha!');
});

controller.hears(['hello'], 'message_received', (bot, message) => {
	bot.reply(message, 'Hey there.');
});

function verifyTestUser(req) {
	if (req.body.sender.id !== process.env.TEST_USER_ID) {
		throw new Error('Not a valid user');
	}
}
