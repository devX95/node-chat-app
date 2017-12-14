const expect = require('expect');

const {isRealString} = require('./validation');

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

describe('Is real String', ()=>{
    it('should reject non string values', () => {
        var data = 123;
        expect(isRealString(data)).toBeFalsy();
    });
    it('should reject string with only spaces', () => {
        var data = "   ";
        expect(isRealString(data)).toBeFalsy();
    });
    it('should allow string with non=space characters', () => {
        var data = "dkajsh134";
        expect(isRealString(data)).toBeTruthy();
    });
});