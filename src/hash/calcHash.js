const { createHash } = await import("node:crypto");
import { createReadStream } from "node:fs";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";

const FILE_NAME = "fileToCalculateHashFor.txt";
const FILE_PATH = join("src", "hash", "files", FILE_NAME);

const calculateHash = async () => {
  const hash = createHash("sha256");
  const input = createReadStream(FILE_PATH);
  try {
    await pipeline(input, hash);

    console.log(`${hash.digest("hex")}`);
  } catch (err) {
    console.error(err);
  }
};

await calculateHash();
