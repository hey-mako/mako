const request = require('request');

const reviewAppId = '106106383597456';
const fbBaseUrl = 'https://graph.facebook.com/v2.12';

const herokuAppName = process.env.HEROKU_APP_NAME;
const callbackUrl = `https://${herokuAppName}.herokuapp.com`;

const subOptions = {
	uri: `${fbBaseUrl}/${reviewAppId}/subscriptions`,
	method: 'POST',
	qs: {
		callback_url: callbackUrl, // eslint-disable-line camelcase
		object: 'page',
		fields: 'messages',
		verify_token: 'TOKEN', // eslint-disable-line camelcase
	},
};

request(subOptions, err => {
	if (err) {
		throw new Error(err);
	}

	console.log(`Webhook subscription set on ${callbackUrl}`);
});

const testUserOptions = {
	uri: `${fbBaseUrl}/${reviewAppId}/accounts/test-users`,
	method: 'POST',
	qs: {
		name: herokuAppName,
	},
};

request(testUserOptions, (err, data) => {
	if (err) {
		throw new Error(err);
	}

	process.env.TEST_USER_ID = data.id;
	process.env.TEST_USER_EMAIL = data.email;
});
