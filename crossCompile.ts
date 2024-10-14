import { $ } from "bun";

console.log("Trying to compile qrcode-rs...");

await $`sudo systemctl start docker`;

await $`cross build --release --target aarch64-unknown-linux-gnu`;
await $`cross build --release --target x86_64-unknown-linux-gnu`;
await $`cross build --release --target x86_64-pc-windows-gnu`;

await $`mkdir -p ./build ./build/aarch64-linux ./build/x86_64-windows ./build/x86_64-linux`;
await $`cp ./target/aarch64-unknown-linux-gnu/release/libqrcode_rs.so ./build/aarch64-linux/qrcode_rs.so`;
await $`cp ./target/x86_64-unknown-linux-gnu/release/libqrcode_rs.so ./build/x86_64-linux/qrcode_rs.so`;
await $`cp ./target/x86_64-pc-windows-gnu/release/qrcode_rs.dll ./build/x86_64-windows/qrcode_rs.dll`;
