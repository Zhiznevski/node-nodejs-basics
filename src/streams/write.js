import { createWriteStream } from "node:fs";
import { stdin } from "node:process";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";
import { getDirname } from "../utils/getDirname.js";

const FOLDER_NAME = "files";
const FILE_NAME = "fileToWrite.txt";
const FILE_PATH = join(getDirname(import.meta.url), FOLDER_NAME, FILE_NAME);

const write = async () => {
  try {
    await pipeline(stdin, createWriteStream(FILE_PATH));
  } catch (err) {
    console.error(err);
  }
};

await write();
