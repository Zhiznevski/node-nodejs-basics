import { rm } from "node:fs/promises";
import path from "node:path";
import { getDirname } from "../utils/getDirname.js";
import { errorConstants } from "../utils/errorConstants.js";

const FOLDER_NAME = "files";
const FILE_NAME = "fileToRemove.txt";
const FILE_PATH = path.join(
  getDirname(import.meta.url),
  FOLDER_NAME,
  FILE_NAME
);
const ERROR_MESSAGE = "FS operation failed";

const remove = async () => {
  try {
    await rm(FILE_PATH);
  } catch (err) {
    if (err.code === errorConstants.ENOENT) {
      throw new Error(ERROR_MESSAGE);
    }
    throw err;
  }
};

await remove();
