// Static hosts serve "/" as out/index.html. Since every page lives under
// /[locale], there is no such file by default and "/" 403s/404s. Copy the
// default locale's prerendered page so "/" shows English content directly,
// without a client redirect (the proxy that used to do this doesn't run
// against a static export).
import { copyFile, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const configPath = fileURLToPath(new URL("../src/i18n/config.ts", import.meta.url));
const configSource = await readFile(configPath, "utf8");
const match = configSource.match(/defaultLocale:\s*Locale\s*=\s*"([^"]+)"/);
if (!match) throw new Error(`Could not find defaultLocale in ${configPath}`);
const defaultLocale = match[1];

const outDir = fileURLToPath(new URL("../out", import.meta.url));
const source = path.join(outDir, `${defaultLocale}.html`);
const destination = path.join(outDir, "index.html");

await copyFile(source, destination);
console.log(`Copied ${source} -> ${destination}`);
