import fs from "node:fs/promises";

const FILE_NAME = "fresh.txt";
const FILE_CONTENT = "I am fresh and young";
const FILE_PATH = `./src/fs/files/${FILE_NAME}`;
const ERROR_MESSAGE = "FS operation failed";

const create = async () => {
  try {
    await fs.writeFile(FILE_PATH, FILE_CONTENT, { flag: "wx" });
  } catch (err) {
    if (err.code === "EEXIST") {
      throw new Error(ERROR_MESSAGE);
    }
    console.error(err);
  }
};

await create();
