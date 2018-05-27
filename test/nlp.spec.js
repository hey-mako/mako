import test from 'ava';
import nlp from '../src/libs/nlp';

const rawMock = require('./mocks/message.json');

const botStub = () => ({});

test('NLP should be processed properly', t => {
	const mockMap = {
		matchIntent: () => {
			return 'Executed';
		},
	};

	const process = nlp.load(mockMap);
	t.is(
		typeof process === 'function',
		true,
		'Check process returns delay function'
	);

	const mockMessage = rawMock.entry[0].messaging[0].message;
	t.is(
		process(botStub, mockMessage),
		'Executed',
		'Check if it executes on default threshold'
	);

	const failProcess = nlp.load(mockMap, 1);
	const processError = t.throws(() => failProcess(botStub, mockMessage), Error);
	t.is(processError.message, 'No entities meet set threshold');
});
