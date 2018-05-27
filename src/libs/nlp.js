/**
 * Load a map of intents to functions and a desired threshold,
 * @param {object} intentMap
 * @param {num} threshold
 */
module.exports.load = (intentMap, threshold) => (bot, message) => {
	const defaultTreshold = 0.9;
	const primaryIntent = message.nlp.entities.intent[0];

	if (!primaryIntent || !intentMap) {
		throw new Error('No entities present or intentMap set');
	}

	const setThreshold = threshold || defaultTreshold;
	const meetsThreshold = primaryIntent.confidence >= setThreshold;
	const intentFunction = intentMap[primaryIntent.value];

	if (!intentFunction) {
		throw new Error('No matching intent function found');
	}

	if (!meetsThreshold) {
		throw new Error('No entities meet set threshold');
	}

	return intentFunction(bot, message);
};
