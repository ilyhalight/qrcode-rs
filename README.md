# qrcode-rs

⚡ Fast [qrcode-rust](https://github.com/kennytm/qrcode-rust) bindings for bun.sh

Supported platforms: Windows x64, Linux x64 / Aarch64

```bash
bun i @toil/qrcode-rs
```

## Available functions

1. Generate QR Code and get result as png base64
2. Generate QR Code as string

TODO:

1. Add a picture to a QR code
2. Add save QR as file
3. Change minimal and maximum size
4. Change background and module colors
5. Option to remove quiet zone

## Compiling

Only under Linux / WSL

1. Install Rust
2. Install Docker
3. Install Cross

```bash
cargo install cross
```

4. Compile

```bash
bun run compile
```
