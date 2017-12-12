const expect = require('expect');
const {generateMessage} = require('./message');

expect.extend({
	toBeType(received, argument) {
		const initialType = typeof received;
		const type = initialType === "object" ? Array.isArray(received) ? "array" : initialType : initialType;
		return type === argument ? {
			message: () => `expected ${received} to be type ${argument}`,
			pass: true
		} : {
			message: () => `expected ${received} to be type ${argument}`,
			pass: false
		};
	}
});

describe('generateMesage', () => {
    it('should generate the correct message object', () => {
        var from = "Gibran";
        var text = "some message";
        var message = generateMessage(from, text);
        expect(message.createdAt).toBeType('number');
        expect(message.from).toEqual(from);
        expect(message.text).toEqual(text);

    });
    
});