use image::Luma;
use libc::c_char;
use qrcode::QrCode;

use base64::{engine::general_purpose, Engine as _};
use image::ImageFormat;
use std::{
    ffi::{CStr, CString},
    io::Cursor,
};

#[no_mangle]
pub extern "C" fn qrcode(ptr: *const c_char) -> *const c_char {
    let text_str = unsafe { CStr::from_ptr(ptr) };
    let text = match text_str.to_str() {
        Ok(s) => s,
        Err(e) => {
            eprintln!("Bad encoding: {}", e);
            return std::ptr::null();
        }
    };

    let code = QrCode::new(text.as_bytes()).unwrap();

    // Render the bits into an image.
    let image = code.render::<Luma<u8>>().build();

    let mut image_data: Vec<u8> = Vec::new();
    image
        .write_to(&mut Cursor::new(&mut image_data), ImageFormat::Png)
        .unwrap();
    let res_base64 = general_purpose::STANDARD.encode(image_data);
    let result = format!("data:image/png;base64,{}", res_base64);
    let c_str = CString::new(result).unwrap();
    let p = c_str.as_ptr();
    std::mem::forget(c_str);
    p
}
