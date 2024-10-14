import path from "node:path";
import { dlopen, FFIType, suffix } from "bun:ffi";

function getPlatform() {
  if (process.platform === "win32" && process.arch === "x64") {
    return "x86_64-windows";
  }

  if (process.platform === "linux" && ["arm64", "x64"].includes(process.arch)) {
    return process.arch === "arm64" ? "aarch64-linux" : "x86_64-linux";
  }

  throw new Error("Running on unsupported platform");
}

const libPath = path.join(
  __dirname,
  "..",
  "build",
  getPlatform(),
  `qrcode_rs.${suffix}`
);

const lib = dlopen(libPath, {
  qrcode: {
    args: [FFIType.cstring],
    returns: FFIType.cstring,
  },
});

const enc = new TextEncoder();

export function qrcode(text: string) {
  if (!text) {
    return null;
  }

  return lib.symbols.qrcode(enc.encode(`${text}\0`));
}
