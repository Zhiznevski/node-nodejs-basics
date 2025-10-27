import { rename as fsRename, access } from "node:fs/promises";
import path from "node:path";
import { getDirname } from "../utils/getDirname.js";
import { errorConstants } from "../utils/errorConstants.js";

const FOLDER_NAME = "files";
const ORIGINAL_FILE_NAME = "wrongFilename.txt";
const NEW_FILE_NAME = "properFilename.md";
const ORIGINAL_FILE_PATH = path.join(
  getDirname(import.meta.url),
  FOLDER_NAME,
  ORIGINAL_FILE_NAME
);
const NEW_FILE_PATH = path.join(
  getDirname(import.meta.url),
  FOLDER_NAME,
  NEW_FILE_NAME
);
const ERROR_MESSAGE = "FS operation failed";

const isFileExist = async (path) => {
  try {
    await access(path);
    return true;
  } catch (err) {
    if (err.code === errorConstants.ENOENT) {
      return false;
    }
    throw err;
  }
};

const rename = async () => {
  try {
    const isNewFileExist = await isFileExist(NEW_FILE_PATH);
    if (isNewFileExist) {
      throw new Error(ERROR_MESSAGE);
    }
    await fsRename(ORIGINAL_FILE_PATH, NEW_FILE_PATH);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(ERROR_MESSAGE);
    }
    console.log(err);
  }
};

await rename();
