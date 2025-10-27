import { createReadStream } from "node:fs";
import { stdout } from "node:process";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";
import { getDirname } from "../utils/getDirname.js";

const FOLDER_NAME = "files";
const FILE_NAME = "fileToRead.txt";
const FILE_PATH = join(getDirname(import.meta.url), FOLDER_NAME, FILE_NAME);

const read = async () => {
  try {
    await pipeline(createReadStream(FILE_PATH), stdout);
  } catch (err) {
    console.error(err);
  }
};

await read();
