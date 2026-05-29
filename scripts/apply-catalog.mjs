#!/usr/bin/env node
/**
 * Rewrites external dependency versions in workspace package.json files to `catalog:`.
 * Workspace packages (workspace:*) are left unchanged.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const workspaceYaml = readFileSync(join(root, "pnpm-workspace.yaml"), "utf8")
const catalogKeys = new Set()
for (const line of workspaceYaml.split("\n")) {
  const m = line.match(/^ {2}("?)([^":#]+)\1:\s/)
  if (m) catalogKeys.add(m[2].trim())
}

const packageDirs = [
  root,
  ...["apps", "packages"].flatMap((dir) =>
    readdirSync(join(root, dir)).map((name) => join(root, dir, name))
  ),
].filter((dir) => {
  try {
    return statSync(join(dir, "package.json")).isFile()
  } catch {
    return false
  }
})

function catalogize(deps) {
  if (!deps) return deps
  const next = { ...deps }
  for (const name of Object.keys(next)) {
    const val = next[name]
    if (typeof val !== "string" || val.startsWith("workspace:") || val === "catalog:") {
      continue
    }
    if (catalogKeys.has(name)) {
      next[name] = "catalog:"
    }
  }
  return next
}

for (const dir of packageDirs) {
  const path = join(dir, "package.json")
  const pkg = JSON.parse(readFileSync(path, "utf8"))
  let changed = false
  for (const field of ["dependencies", "devDependencies", "optionalDependencies"]) {
    if (!pkg[field]) continue
    const updated = catalogize(pkg[field])
    if (JSON.stringify(updated) !== JSON.stringify(pkg[field])) {
      pkg[field] = updated
      changed = true
    }
  }
  if (changed) {
    writeFileSync(path, `${JSON.stringify(pkg, null, 2)}\n`)
    console.log("updated", path.replace(`${root}/`, ""))
  }
}
