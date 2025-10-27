import { readFile } from "node:fs/promises";
import path from "node:path";
import { getDirname } from "../utils/getDirname.js";
import { errorConstants } from "../utils/errorConstants.js";

const FOLDER_NAME = "files";
const FILE_NAME = "fileToRead.txt";
const FILE_PATH = path.join(
  getDirname(import.meta.url),
  FOLDER_NAME,
  FILE_NAME
);
const ERROR_MESSAGE = "FS operation failed";

const read = async () => {
  try {
    const res = await readFile(FILE_PATH, {
      encoding: "utf8",
    });
    console.log(res);
  } catch (err) {
    if (err.code === errorConstants.ENOENT) {
      throw new Error(ERROR_MESSAGE);
    }
    throw err;
  }
};

await read();
