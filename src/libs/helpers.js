module.exports.extractPayloadData = payload => {
	return payload.substr(payload.indexOf('::') + 2, payload.length);
};
