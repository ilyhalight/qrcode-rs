# 0.x.x

- Bump rust edition to 2024
- Updated benchmarks (bump zxing-wasm to v2)

# 0.1.1

- Added generate qrcode string
- Fixed qrcode return type (CString -> string)
- Fixed a bug that caused a panic if the qrcode couldn't be generated (now returns throw from js)
- Removed print error to console from rust

# 0.1.0

- Initial release
