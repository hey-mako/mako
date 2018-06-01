module.exports = controller => {
	controller.middleware.normalize.use((bot, message, next) => {
		if (message.quick_reply) {
			message.payload = message.quick_reply.payload;
			message.text = message.quick_reply.payload;
			message.label = message.quick_reply.text;
			message.type = 'facebook_quick_reply';
		}
		next();
	});
};
