const quickReplyMiddleware = require('botkit-fb-quick-reply');

module.exports = controller => {
	quickReplyMiddleware(controller);
};
