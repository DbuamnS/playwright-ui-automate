import fs from "node:fs";
import path from "node:path";

function readFile(relativePath: string): string {
  const fullPath = path.resolve(process.cwd(), relativePath);
  return fs.readFileSync(fullPath, "utf8");
}

export function readJson<T = unknown>(relativePath: string): T {
  return JSON.parse(readFile(relativePath)) as T;
}

export function readSql(relativePath: string): string {
  return readFile(relativePath);
}

export const resource = {
  readJson,
  readSql,
} as const;
