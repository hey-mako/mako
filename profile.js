module.exports = controller => {
	controller.api.nlp.enable(process.env.WIT_AI_TOKEN);
	controller.api.messenger_profile.greeting(
		'The best way to find your next apartment'
	);
	controller.api.messenger_profile.get_started('GET_STARTED');
};
