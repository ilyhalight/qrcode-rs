## Results

As you can see, **qrcode-rs** are second only to **fast_qr**. But this can't be said to be objective, since **fast_qr** returns _svg instead of png_, which turns out to be a bit inconsistent compared to other libraries.

Ubuntu WSL (Ryzen 3700x16):

```bash
$ bun run mitata.js
clk: ~2.02 GHz
cpu: AMD Ryzen 7 PRO 3700 8-Core Processor
runtime: bun 1.2.5 (x64-linux)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
qrcode-rs                    237.74 µs/iter 246.53 µs  █
                    (206.17 µs … 554.27 µs) 401.00 µs  █
                    (  0.00  b … 324.00 kb)   3.63 kb ▆██▄▃▃▄▃▂▂▂▂▂▁▁▁▁▁▁▁▁

fast_qr                      217.69 µs/iter 229.29 µs  █
                      (178.15 µs … 1.68 ms) 420.84 µs ██
                    (  0.00  b …   2.58 mb)  19.81 kb ██▆▇▆▄▃▃▃▃▂▂▂▁▁▁▁▁▁▁▁

qrcode-node                    1.88 ms/iter   1.84 ms  █
                        (1.09 ms … 6.09 ms)   5.64 ms ▂██
                    (  0.00  b …   1.07 mb)  54.40 kb ███▇▅▃▂▂▁▁▁▂▁▂▂▂▂▂▂▂▁

zxing-wasm                   378.64 µs/iter 394.42 µs  █
                      (299.36 µs … 4.98 ms) 766.64 µs ▆█▄
                    (  0.00  b …   6.19 mb)  33.28 kb █████▅▄▄▃▂▂▂▂▁▁▁▁▁▁▁▁

summary
  fast_qr
   1.09x faster than qrcode-rs
   1.74x faster than zxing-wasm
   8.64x faster than qrcode-node
```

Debian 12 (Xeon Gold 6150x4)

```bash
$ bun run mitata.ts
clk: ~2.42 GHz
cpu: Intel(R) Xeon(R) Gold 6150 CPU @ 2.70GHz
runtime: bun 1.1.30 (x64-linux)

benchmark              avg (min … max) p75   p99    (min … top 1%)
-------------------------------------- -------------------------------
qrcode-rs               535.30 µs/iter 695.31 µs ▆▄             ██
               (286.20 µs … 880.10 µs) 809.23 µs ██▆▄▄▅▄▄▄▄▃▃▄▃▅███▄▃▂
fast_qr                 337.11 µs/iter 359.87 µs   █▇
                 (204.41 µs … 2.63 ms) 938.98 µs ▂▃███▇▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁
qrcode-node               3.25 ms/iter   3.60 ms   ▅▅█▃▄▃
                   (1.92 ms … 6.96 ms)   6.35 ms ▇▇██████▆▄▆▂▃▂▄▃▃▂▂▂▁
zxing-wasm                1.77 ms/iter   1.83 ms  ██▄
                   (1.29 ms … 6.04 ms)   4.49 ms ▄████▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁

summary
  fast_qr
   1.59x faster than qrcode-rs
   5.24x faster than zxing-wasm
   9.63x faster than qrcode-node
```

Ubuntu (Ampere A1x4)

```bash
$ bun run mitata.ts
clk: ~2.37 GHz
cpu: unknown
runtime: bun 1.1.30 (arm64-linux)

benchmark              avg (min … max) p75   p99    (min … top 1%)
-------------------------------------- -------------------------------
qrcode-rs               383.88 µs/iter 386.32 µs  █▃
               (373.28 µs … 515.85 µs) 453.73 µs ▄██▅▄▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
fast_qr                 271.47 µs/iter 271.20 µs  █▄
                 (244.72 µs … 1.07 ms) 448.37 µs ▅██▅▂▂▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁
qrcode-node               2.56 ms/iter   2.61 ms ▃█▂
                   (2.15 ms … 4.83 ms)   4.29 ms ███▅▃▂▂▁▂▂▂▂▂▂▂▂▂▁▁▁▁
zxing-wasm                1.43 ms/iter   1.40 ms ▇█
                   (1.32 ms … 4.37 ms)   3.00 ms ██▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

summary
  fast_qr
   1.41x faster than qrcode-rs
   5.27x faster than zxing-wasm
   9.45x faster than qrcode-node
```

Windows 11 (Ryzen 3700)

Maybe this is a Mitata bug (because clk is too low), or on Windows it is really much slower than on Linux

```bash
$ bun run mitata.js
clk: ~1.97 GHz
cpu: AMD Ryzen 7 PRO 3700 8-Core Processor
runtime: bun 1.1.30 (x64-win32)

benchmark              avg (min … max) p75   p99    (min … top 1%)
-------------------------------------- -------------------------------
qrcode-rs               405.60 µs/iter 403.40 µs  █
               (380.80 µs … 626.10 µs) 584.70 µs ██▅▃▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁▂▁
fast_qr                 179.54 µs/iter 194.90 µs  █
               (153.10 µs … 900.80 µs) 307.50 µs ▅█▂▁▂▄▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁
qrcode-node               1.32 ms/iter   1.38 ms  ▃   █▅
                   (1.06 ms … 3.22 ms)   2.08 ms ▅██▆▅███▄▃▁▃▁▂▁▁▁▁▁▁▁
zxing-wasm              887.17 µs/iter 877.10 µs ▅█
                 (823.30 µs … 2.60 ms)   1.83 ms ██▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

summary
  fast_qr
   2.26x faster than qrcode-rs
   4.94x faster than zxing-wasm
   7.33x faster than qrcode-node
```

## How to run

1. Install bun
2. Install depends

```
bun install
```

1. Compile qrcode-rs
2. Run bench

```
bun bench
```
