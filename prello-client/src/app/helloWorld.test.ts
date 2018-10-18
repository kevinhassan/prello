const _chai = require('chai');
const expect = _chai.expect;

describe("Calculator", () => {
    describe("Test Hello world", () => {
        it("Should return hello world", () => {
            const str = "hello world"
            expect(str).to.be.equals("hello world");
        });
    })
});
