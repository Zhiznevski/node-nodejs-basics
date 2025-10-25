import { readdir } from "node:fs/promises";
import path from "node:path";

const FOLDER_PATH = path.join("src", "fs", "files");
const ERROR_MESSAGE = "FS operation failed";

const list = async () => {
  try {
    const files = await readdir(FOLDER_PATH);
    for (const file of files) console.log(file);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(ERROR_MESSAGE);
    }
    throw err;
  }
};

await list();
