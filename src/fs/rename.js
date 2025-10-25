import { rename as fsRename, access } from "node:fs/promises";
import path from "node:path";

const ORIGINAL_FILE_NAME = "wrongFilename.txt";
const NEW_FILE_NAME = "properFilename.md";
const ORIGINAL_FILE_PATH = path.join("src", "fs", "files", ORIGINAL_FILE_NAME);
const NEW_FILE_PATH = path.join("src", "fs", "files", NEW_FILE_NAME);
const ERROR_MESSAGE = "FS operation failed";

const isFileExist = async (path) => {
  try {
    await access(path);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") {
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
