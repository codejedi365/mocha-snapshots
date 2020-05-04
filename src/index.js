const Runnable = require("mocha/lib/runnable");
import chai from "chai";
import { matchSnapshot } from "./matchSnapshot";
import { setup } from "./setup";

const currentContext = {
    runnable: null,
    title: "",
    titleIndex: 0,
};

const runnableRun = Runnable.prototype.run;

Runnable.prototype.run = function () {
    currentContext.runnable = this;
    currentContext.title = this.title;
    currentContext.titleIndex = 0;

    return runnableRun.apply(this, arguments);
};

chai.util.addMethod(chai.Assertion.prototype, "matchSnapshot", function () {
    const obj = chai.util.flag(this, "object");
    matchSnapshot(obj, currentContext);
});

module.exports.setup = setup;
