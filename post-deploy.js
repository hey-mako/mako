const request = require('request');
const rp = require('request-promise');
const converter = require('number-to-words');

process.env.APP_REVIEW_ID = '2186735398249287';
process.env.APP_REVIEW_SECRET = '317090cb5e6612a3c1d473df80b3dd33';

const reviewAppId = process.env.APP_REVIEW_ID;
const herokuAppName = (process.env.HEROKU_APP_NAME) ? process.env.HEROKU_APP_NAME : `test-heroku-pr-${Math.floor(Math.random() * 100)}`;

const fbBaseUrl = 'https://graph.facebook.com/v2.12';
const callbackUrl = `https://${herokuAppName}.ngrok.io/facebook/receive`;

const createTestUser = {
	uri: `${fbBaseUrl}/${reviewAppId}/accounts/test-users`,
	method: 'POST',
	qs: {
		permissions: 'manage_pages,publish_actions,publish_pages',
		access_token: `${reviewAppId}|${process.env.APP_REVIEW_SECRET}`, // eslint-disable-line camelcase
	},
};

rp(createTestUser)
	.then(data => {
		const testUser = JSON.parse(data);

		process.env.TEST_USER_ID = testUser.id;
		process.env.TEST_USER_EMAIL = testUser.email;
		console.log(`Test user created for ${testUser.email} on ${herokuAppName}`);

		const createTestPage = {
			url: `${fbBaseUrl}/${testUser.id}/accounts`,
			body: {
				category_enum: 'PERSONAL_BLOG',
				name: 'Mako AI Test',
				about: 'Test page for review app',
				cover_photo: {
					url: 'https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg'
				},
				picture: 'https://www.gettyimages.ie/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg'
			},
			json: true,
			qs: {
				access_token: testUser.access_token
			},
		};
		return rp.post(createTestPage)
			.then(page => {
				return rp({
					url: `${fbBaseUrl}/me/accounts`,
					qs: {
						access_token: testUser.access_token
					}
				}).then(body => {
					const parsed = JSON.parse(body);
					const pageToken = parsed.data[0].access_token;
					return rp.post({
						url: `${fbBaseUrl}/${page.id}/subscribed_apps`,
						qs: {
							access_token: pageToken
						}
					})
				});
			});
		
	})
	.then(pageToken => {
		const webhookSubscription = {
					uri: `${fbBaseUrl}/${reviewAppId}/subscriptions`,
					qs: {
						callback_url: callbackUrl, // eslint-disable-line camelcase
						object: 'page',
						fields: 'messages',
						verify_token: 'TOKEN', // eslint-disable-line camelcase
					},
				};
			
				return rp.post(webhookSubscription);
			})
	})


function normalizeBuldName(name) {
	const prString = name.match(/\d+/g)[0];
	const prInWords = converter.toWords(parseInt(prString, 10));
	return name
		.replace(prString, prInWords)
		.replace(/-/g, ' ')
		.trim();
}
