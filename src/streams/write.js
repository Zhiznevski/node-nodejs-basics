import { createWriteStream } from "node:fs";
import { stdin } from "node:process";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";

const FILE_NAME = "fileToWrite.txt";
const FILE_PATH = join("src", "streams", "files", FILE_NAME);

const write = async () => {
  try {
    await pipeline(stdin, createWriteStream(FILE_PATH));
  } catch (err) {
    console.error(err);
  }
};

await write();
