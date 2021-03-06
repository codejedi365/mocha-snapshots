import fs from "fs";
import { stringify } from "./stringify";
import { checkCI } from "./checkCI";

export function persistSnaps(snaps, snapshotFilePath) {
    checkCI();

    const snapsFileContent = Object.keys(snaps).reduce(
        (prev, curr) => `${prev}exports["${curr}"] = \`${stringify(snaps[curr], true).replace(/\\/g, "\\\\")}\`;\n\n`,
        ""
    );

    fs.writeFileSync(snapshotFilePath, snapsFileContent, { flag: "w" });
}
