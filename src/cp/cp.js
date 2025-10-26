import { spawn } from "node:child_process";
import { join } from "node:path";

import { getDirname } from "../utils/getDirname.js";

const FOLDER_NAME = "files";
const FILE_NAME = "script.js";

const spawnChildProcess = async (args) => {
  const child = spawn("node", [
    join(getDirname(import.meta.url), FOLDER_NAME, FILE_NAME),
    ...args,
  ]);

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);
};

spawnChildProcess([]);
