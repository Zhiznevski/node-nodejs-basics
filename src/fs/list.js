import { readdir } from "node:fs/promises";
import path from "node:path";
import { getDirname } from "../utils/getDirname.js";
import { errorConstants } from "../utils/errorConstants.js";

const FOLDER_NAME = "files";
const FOLDER_PATH = path.join(getDirname(import.meta.url), FOLDER_NAME);
const ERROR_MESSAGE = "FS operation failed";

const list = async () => {
  try {
    const files = await readdir(FOLDER_PATH);
    files.forEach((file) => console.log(file));
  } catch (err) {
    if (err.code === errorConstants.ENOENT) {
      throw new Error(ERROR_MESSAGE);
    }
    throw err;
  }
};

await list();
