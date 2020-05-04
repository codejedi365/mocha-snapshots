import * as jsDiff from "diff";
import path from "path";
import { stringify } from "./stringify";
import getPrintableDiff from "./getPrintableDiff";
import getExistingSnaps from "./getExistingSnaps";
import getNormalizedTarget from "./getNormalizedTarget";
import persistSnaps from "./persistSnaps";
import { getTestName } from "./getTestName";
import { getOptions } from "./setup";
import { expect } from "chai";

const snapshotExtension = ".mocha-snapshot";
const snapshotsFolder = "__snapshots__";
const shouldUpdateSnapshots = parseInt(process.env.UPDATE, 10) || process.argv.includes("--update");

export function matchSnapshot(value, context) {
    const options = getOptions();
    const dirName = path.dirname(context.runnable.file);
    const fileName = path.basename(context.runnable.file);
    const snapshotDir = path.join(dirName, snapshotsFolder);
    const snapshotFilePath = path.join(snapshotDir, fileName + snapshotExtension);
    const testName = getTestName(context) + "(" + context.titleIndex++ + ")";
    const snaps = getExistingSnaps(snapshotDir, snapshotFilePath);
    const target = options.normalize ? getNormalizedTarget(value) : value;

    let snapDidChange = true;

    if (Object.getOwnPropertyDescriptor(snaps, testName) || false) {
        const existingSnap = stringify(snaps[testName], true);
        const newSnap = stringify(target);
        const diffResult = jsDiff.diffLines(existingSnap, newSnap, { newlineIsToken: true });

        snapDidChange = diffResult.some((it) => it.removed || it.added);

        if (snapDidChange && !shouldUpdateSnapshots) {
            const output = getPrintableDiff(diffResult);
            expect(newSnap, "Snapshot didn't match" + output + "\n").to.deep.equal(existingSnap);
        }
    }

    if (snapDidChange) {
        snaps[testName] = stringify(target);
        persistSnaps(snaps, snapshotFilePath);
    }
}
