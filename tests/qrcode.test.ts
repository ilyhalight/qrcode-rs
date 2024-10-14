import { test, expect, describe } from "bun:test";
import { qrcode } from "../pkg";

describe("generate qrcode (png)", () => {
  test("default text", () => {
    expect(qrcode("qrcode-rs")).toEqual(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOgAAADoCAAAAADAwvekAAAEqElEQVR4Ae3AA6AkWZbG8f937o3IzKdyS2Oubdu2bdu2bdu2bWmMnpZKr54yMyLu+Xa3anqmhztr1a+a/xeo/P9A5f8HKv8/UPn/gcr/D1T+f6Dy/wOV/x+o/P9A5f8HKv8/UPn/gcr/D1T+f6Dy/wOV/x+o/P9A5f8HKv8/UPn/gcr/D1T+f6Dy/wOV/x+o/P9A5f8HKv8/UPn/gcr/D1T+f6Dy/wOVf4H4tzHPn3hO5jmJfxvzQlH5/4HK/w9U/n+g8v8Dlf8fqPz/QOX/ByovIvOiEc+fuMJcIa4QV5jnZF404kVC5f8HKv8/UPn/gcr/D1T+f6Dy/wOV/x+o/CuJ58+8aMQV5kUjnj/zr0Ll/wcq/z9Q+f+Byv8PVP5/oPL/A5X/H6j8FzNXiOdk/lNR+f+Byv8PVP5/oPL/A5X/H6j8/0Dl/wcq/0XMFeIKc4X4L0Hl/wcq/z9Q+f+Byv8PVP5/oPL/A5X/H6j8K5l/HfGczBXiRWP+Q1D5/4HK/w9U/n+g8v8Dlf8fqPz/QOX/ByovIvHvY64QV5grxPMn/kNR+f+Byv8PVP5/oPL/A5X/H6j8/0Dl/wdk/nuI52T+U1H5/4HK/w9U/n+g8v8Dlf8fqPz/QOX/Byr/AnGFeU7iCnOFeE7mCnGFuUJcYZ6TuMJcIa4w/yGo/P9A5f8HKv8/UPn/gcr/D1T+f6Dy/wOV/yDmOYkrzBXiCvOiMVeI52Sek7jCvFBU/n+g8v8Dlf8fqPz/QOX/Byr/P1D5/4HKfxDxnMwV4jmJK8wV4vkTV5j/EFT+f6Dy/wOV/x+o/P9A5f8HKv8/UPn/gcqLSFxhrjDPyTwncYW5QjwncYV5TuIK85zEFebfhMr/D1T+f6Dy/wOV/x+o/P9A5f8HKv8/UPkXmCvEFeJFY64QV5grxBXmCvGczBXiCnOF+Xeh8v8Dlf8fqPz/QOX/Byr/P1D5/4HK/w9UXkTm30c8J3GFedGIK8wV4l+Fyv8PVP5/oPL/A5X/H6j8/0Dl/wcq/z9Q+ReIfxtzhblCXGGeP/GczBXiCvP8mRcJlf8fqPz/QOX/Byr/P1D5/4HK/w9U/n+g8iIyLxrxnMTzJ54/85zM82f+Vaj8/0Dl/wcq/z9Q+f+Byv8PVP5/oPL/A5V/JfH8mefPvHDmCnGFeE7m+RNXmBcJlf8fqPz/QOX/Byr/P1D5/4HK/w9U/n+g8p9MXGGuEM+feU7iCvHCiSvMC0Xl/wcq/z9Q+f+Byv8PVP5/oPL/A5X/H6j8JzNXiOdkrhBXmBeNeU7iRULl/wcq/z9Q+f+Byv8PVP5/oPL/A5X/H6j8K5l/H/OczBXihTPPn3mRUPn/gcr/D1T+f6Dy/wOV/x+o/P9A5f8HKi8i8W8jrjBXiOfPPCfxnMQV5gpxhXmRUPn/gcr/D1T+f6Dy/wOV/x+o/P9A5f8HZP5foPL/A5X/H6j8/0Dl/wcq/z9Q+f+Byv8PVP5/oPL/A5X/H6j8/0Dl/wcq/z9Q+f+Byv8PVP5/oPL/A5X/H6j8/0Dl/wcq/z9Q+f+Byv8PVP5/oPL/A5X/H6j8/0Dl/wcq/z9Q+f+Byv8P/CMjz1qTKbFYoQAAAABJRU5ErkJggg=="
    );
  });
  test("empty string", () => {
    expect(qrcode("")).toEqual(null);
  });
});
