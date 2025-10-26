import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const getDirname = (metaUrl) => dirname(fileURLToPath(metaUrl));
