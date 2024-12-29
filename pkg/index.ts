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
  qrcode_str: {
    args: [FFIType.cstring],
    returns: FFIType.cstring,
  },
});

const enc = new TextEncoder();

export enum QRCodeError {
  /**
   * The data is too long to encode into a QR code for the given version
   */
  DataTooLong = "data too long",
  /**
   * The provided version / error correction level combination is invalid
   */
  InvalidVersion = "invalid version",
  /**
   * Some characters in the data cannot be supported by the provided QR code version
   */
  UnsupportedCharacterSet = "unsupported character set",
  /**
   * The provided ECI designator is invalid. A valid designator should be between 0 and 999999.
   */
  InvalidEciDesignator = "invalid ECI designator",
  /**
   * A character not belonging to the character set is found.
   */
  InvalidCharacter = "invalid character",

  /**
   * Custom error with invalid utf8 text
   */
  InvalidUtf8Sequence = "invalid UTF-8 sequence",
}

function throwOnError(resultStr: string) {
  if (Object.values(QRCodeError).includes(resultStr as QRCodeError)) {
    throw new Error(resultStr);
  }

  if (resultStr.includes("invalid utf-8 sequence")) {
    throw new Error(QRCodeError.InvalidUtf8Sequence);
  }

  return true;
}

export function qrcode(text: string): null | string {
  if (!text) {
    return null;
  }

  const result = lib.symbols.qrcode(enc.encode(`${text}\0`));
  const resultStr = result.toString();
  throwOnError(resultStr);

  return `data:image/png;base64,${resultStr}`;
}

export function qrcodeString(text: string) {
  if (!text) {
    return null;
  }

  const result = lib.symbols.qrcode_str(enc.encode(`${text}\0`));
  const resultStr = result.toString();
  throwOnError(resultStr);

  return resultStr;
}
