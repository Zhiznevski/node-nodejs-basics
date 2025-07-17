import { spawn } from "node:child_process";
import { dirname, join } from "node:path";

import { fileURLToPath } from "url";
const _dirname = dirname(fileURLToPath(import.meta.url));

const spawnChildProcess = async (args) => {
  const child = spawn("node", [join(_dirname, "files", "script.js"), ...args]);

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);
};

spawnChildProcess([]);
