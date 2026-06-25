import { FileNode, FILE_MODE_TREE, PROJECT_MODE_TREE, getContent, extOf } from "./mockFiles";

// A tiny localStorage-backed virtual file system. Content store + persistence
// only — no APIs, no real filesystem. The Explorer tree is derived from the
// set of file paths held here (seeded from the existing mock trees so the app
// looks identical on first load).

const VFS_KEY = "tavronus-forge-vfs-v1";

export type VfsFile = { content: string; original: string };
export type Vfs = Record<string, VfsFile>;

// Flatten a FileNode tree into an ordered list of { path, name } (files only).
// Order is preserved so a tree rebuilt from these paths matches the original.
function flatten(nodes: FileNode[], prefix = ""): { path: string; name: string }[] {
  const out: { path: string; name: string }[] = [];
  for (const node of nodes) {
    const path = prefix ? `${prefix}/${node.name}` : node.name;
    if (node.type === "dir") out.push(...flatten(node.children ?? [], path));
    else out.push({ path, name: node.name });
  }
  return out;
}

// Seed the VFS from the existing mock trees + MOCK_CODE (via getContent).
export function seedVfs(): Vfs {
  const vfs: Vfs = {};
  for (const { path, name } of [...flatten(FILE_MODE_TREE), ...flatten(PROJECT_MODE_TREE)]) {
    const content = getContent(path, name);
    vfs[path] = { content, original: content };
  }
  return vfs;
}

function isValidVfs(v: unknown): v is Vfs {
  if (!v || typeof v !== "object") return false;
  return Object.values(v as Record<string, unknown>).every(
    (f) =>
      !!f &&
      typeof f === "object" &&
      typeof (f as VfsFile).content === "string" &&
      typeof (f as VfsFile).original === "string"
  );
}

export function saveVfsToStorage(vfs: Vfs): void {
  try {
    localStorage.setItem(VFS_KEY, JSON.stringify(vfs));
  } catch {
    /* ignore quota / disabled storage */
  }
}

// Load persisted VFS, or seed + persist on first run. Invalid data is ignored.
export function loadVfs(): Vfs {
  try {
    const raw = localStorage.getItem(VFS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (isValidVfs(parsed)) return parsed;
    }
  } catch {
    /* ignore corrupt storage */
  }
  const seeded = seedVfs();
  saveVfsToStorage(seeded);
  return seeded;
}

// Build a nested FileNode tree from a list of paths, preserving insertion
// order (so the seeded order reproduces the original Explorer trees exactly).
export function buildTreeFromPaths(paths: string[]): FileNode[] {
  const root: FileNode[] = [];
  const dirs = new Map<string, FileNode>();
  for (const path of paths) {
    const segs = path.split("/");
    let level = root;
    let prefix = "";
    for (let i = 0; i < segs.length; i++) {
      const seg = segs[i];
      prefix = prefix ? `${prefix}/${seg}` : seg;
      if (i === segs.length - 1) {
        level.push({ name: seg, type: "file", ext: extOf(seg) });
      } else {
        let dir = dirs.get(prefix);
        if (!dir) {
          dir = { name: seg, type: "dir", children: [] };
          dirs.set(prefix, dir);
          level.push(dir);
        }
        level = dir.children!;
      }
    }
  }
  return root;
}
