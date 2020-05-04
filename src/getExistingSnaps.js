import fs from "fs";
import { checkCI } from "./checkCI";

module.exports = function (snapshotDir, snapshotFilePath) {
    let snaps = {};

    if (!fs.existsSync(snapshotDir)) {
        checkCI();
        fs.mkdirSync(snapshotDir);
    }

    if (fs.existsSync(snapshotFilePath)) snaps = require(snapshotFilePath);
    else checkCI();

    return snaps;
};
