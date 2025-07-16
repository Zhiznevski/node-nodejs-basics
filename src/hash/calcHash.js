const { createHash } = await import("node:crypto");
import { createReadStream } from "node:fs";
import { join } from "node:path";

const FILE_NAME = "fileToCalculateHashFor.txt";
const FILE_PATH = join("src", "hash", "files", FILE_NAME);
const hash = createHash("sha256");

const input = createReadStream(FILE_PATH);

const calculateHash = async () => {
  input.on("readable", () => {
    const data = input.read();
    if (data) hash.update(data);
    else {
      console.log(`${hash.digest("hex")}`);
    }
  });
};

await calculateHash();
