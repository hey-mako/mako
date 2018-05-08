const request = require('request');

const reviewAppId = process.env.APP_REVIEW_ID;
const fbBaseUrl = 'https://graph.facebook.com/v2.12';

const herokuAppName = process.env.HEROKU_APP_NAME;
const callbackUrl = `https://${herokuAppName}.ngrok.io`;

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
		access_token: `${reviewAppId}|${process.env.APP_REVIEW_SECRET}`, // eslint-disable-line camelcase
	},
};

request(testUserOptions, (err, data) => {
	if (err) {
		throw new Error(err);
	}
	const parsed = JSON.parse(data);

	process.env.TEST_USER_ID = parsed.id;
	process.env.TEST_USER_EMAIL = parsed.email;
	console.log(`Test user created for ${parsed.email} on ${herokuAppName}`);
});
