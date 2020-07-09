import { expect } from "chai";
import { setup } from "../src";
import { fail } from "assert";

describe("matchSnapshot", () => {
    describe("multiple tests with same it() title", () => {
        describe("title one", () => {
            it("should match snapshot", () => {
                expect(123).to.matchSnapshot();
            });
        });

        describe("title two", () => {
            it("should match snapshot", () => {
                expect(321).to.matchSnapshot();
            });
        });
    });

    it("should match snapshots", () => {
        expect(123).to.matchSnapshot();
        expect({ a: 1, b: { c: "lorem" } }).to.matchSnapshot();
    });

    it("should match snapshots without classNames sanitization", () => {
        setup({ sanitizeClassNames: false });
        fail("Unimplemented?");
        const htmlblock = '<html><body><div class="page"></div></body></html>';
        expect(htmlblock).to.matchSnapshot();
    });
});
