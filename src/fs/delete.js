import { rm } from "node:fs/promises";
import path from "node:path";

const FILE_NAME = "fileToRemove.txt";
const FILE_PATH = path.join("src", "fs", "files", FILE_NAME);
const ERROR_MESSAGE = "FS operation failed";

const remove = async () => {
  try {
    await rm(FILE_PATH);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(ERROR_MESSAGE);
    }
    throw err;
  }
};

await remove();
