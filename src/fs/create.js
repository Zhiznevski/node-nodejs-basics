import fs from "node:fs/promises";
import path from "node:path";
import { getDirname } from "../utils/getDirname.js";
import { errorConstants } from "../utils/errorConstants.js";

const FOLDER_NAME = "files";
const FILE_NAME = "fresh.txt";
const FILE_CONTENT = "I am fresh and young";
const FILE_PATH = path.join(
  getDirname(import.meta.url),
  FOLDER_NAME,
  FILE_NAME
);
const ERROR_MESSAGE = "FS operation failed";

const create = async () => {
  try {
    await fs.writeFile(FILE_PATH, FILE_CONTENT, { flag: "wx" });
  } catch (err) {
    if (err.code === errorConstants.EEXIST) {
      throw new Error(ERROR_MESSAGE);
    }
    console.error(err);
  }
};

await create();
