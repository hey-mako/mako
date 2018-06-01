import test from 'ava';
import helpers from '../src/libs/helpers';

test('Test helpers', t => {
	const testPayload = 'PAYLOAD:TYPE::DATA_HERE';
	const testPayload2 = 'PAYLOAD:TYPE:TYPE2222::12030123012930219321';
	t.is(helpers.extractPayloadData(testPayload), 'DATA_HERE');
	t.is(helpers.extractPayloadData(testPayload2), '12030123012930219321');
});
