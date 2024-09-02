import fs from "fs/promises";
import path from "path";
import * as esbuild from "esbuild";

/**
 * Build config for esbuild
 * @typedef {import("esbuild").BuildOptions} BuildOptions
 * @type {BuildOptions}
 */
const config = {
  bundle: false,
  platform: "node",
  packages: "external",
  outdir: "dist",
  minify: false,
  target: "node16"
};

const __dirname = new URL(".", import.meta.url).pathname.slice(0, -1);

/**
 * Removes old build directory and creates a fresh one
 */
async function handleClean() {
  console.log("Cleaning");
  await fs.rm(config.outdir, { recursive: true, force: true });
  await fs.mkdir(config.outdir);
}

/**
 * finds all js files in a directory
 */
async function discoverDirectory(dirPath) {
  const dir = await fs.readdir(dirPath);
  return dir
    .filter(str => str.endsWith(".js"))
    .map(file => path.relative(__dirname, path.join(dirPath, file)));
}

async function handlePkgJson() {
  const pkg = await fs
    .readFile("package.json", "utf-8")
    .then(file => JSON.parse(file));
  if (typeof pkg != "object" || pkg === null) {
    throw new Error("Could not read package.json");
  }

  console.log("Processing package.json");
  const { publishConfig, "clean-publish": cleanPublish, ...pkgRest } = pkg;
  const pkgProcessed = Object.assign({}, pkgRest, publishConfig);

  // handle removing fields
  const removeFields = ["devDependencies", ...cleanPublish.fields];
  for (const field of removeFields) {
    delete pkgProcessed[field];
  }

  return fs.writeFile(
    path.join(config.outdir, "package.json"),
    JSON.stringify(pkgProcessed, null, 2),
    "utf-8"
  );
}

/**
 * Statically copy files to the outdir
 * @typedef {string | [string, string]} File
 * @typedef {File[]} Files
 * @param {Files} files Array of files to copy to outdir. Use nested array to change filename such as ["foo.build.json", "foo.json"].
 * @returns
 */
async function copyFiles(files) {
  const res = await Promise.allSettled(
    files.map(file => {
      const [fileIn, fileOut] = Array.isArray(file) ? file : [file, file];
      const outPath = path.join(config.outdir, fileOut);
      console.log(`Copying ${fileIn} to ${outPath}`);
      return fs.cp(fileIn, outPath, { force: true });
    })
  );

  const err = res.find(r => r.status == "rejected");
  if (err) {
    throw new Error(`Error while copying files: ${err.reason}`);
  }

  return;
}

/**
 * Handle build of CJS bundle
 * @returns Promise
 */
function buildCJS(entryPoints) {
  console.log("Building cjs bundles");
  return esbuild.build({
    ...config,
    entryPoints,
    format: "cjs"
  });
}

async function build() {
  // Clean dist directory
  await handleClean();

  console.log("Discovering source files");
  const dirs = await Promise.all([
    discoverDirectory("src"),
    discoverDirectory("src/configs"),
    discoverDirectory("src/rules"),
    discoverDirectory("src/legacy")
  ]);
  const entryPoints = dirs.flat();

  console.log("Starting build");
  const res = await Promise.allSettled([
    buildCJS(entryPoints),
    copyFiles(["README.md", "LICENSE"]),
    handlePkgJson()
  ]);

  // handle logging errors
  const err = res.filter(r => r.status === "rejected");
  for (const e of err) {
    console.error(`BuildError: ${e.reason}`);
  }
  if (err.length > 0) process.exit(1);
}

build().then(() => {
  console.log("Completed build");
});
