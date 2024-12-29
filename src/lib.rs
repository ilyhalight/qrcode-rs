use image::Luma;
use libc::c_char;
use qrcode::QrCode;

use base64::{engine::general_purpose, Engine as _};
use image::ImageFormat;
use std::{
    ffi::{CStr, CString},
    io::Cursor,
};

fn qrcode_internal(ptr: *const c_char) -> Result<QrCode, String> {
    let text_str = unsafe { CStr::from_ptr(ptr) };
    let text = match text_str.to_str() {
        Ok(s) => s,
        Err(err) => {
            return Err(format!("{err}"));
        }
    };

    return match QrCode::new(text.as_bytes()) {
        Ok(qrcode) => Ok(qrcode),
        Err(err) => Err(format!("{err}")),
    };
}

fn return_c_str(text: String) -> *const c_char {
    let c_str = CString::new(text).unwrap();
    let p = c_str.as_ptr();
    std::mem::forget(c_str);
    p
}

#[no_mangle]
pub extern "C" fn qrcode(ptr: *const c_char) -> *const c_char {
    let qrcode = match qrcode_internal(ptr) {
        Ok(qrcode) => qrcode,
        Err(err) => {
            return return_c_str(err);
        }
    };

    // Render the bits into an image.
    let image = qrcode.render::<Luma<u8>>().build();

    let mut image_data: Vec<u8> = Vec::new();
    image
        .write_to(&mut Cursor::new(&mut image_data), ImageFormat::Png)
        .unwrap();
    let res_base64 = general_purpose::STANDARD.encode(image_data);
    return_c_str(res_base64)
}

#[no_mangle]
pub extern "C" fn qrcode_str(ptr: *const c_char) -> *const c_char {
    let qrcode = match qrcode_internal(ptr) {
        Ok(qrcode) => qrcode,
        Err(err) => {
            return return_c_str(err);
        }
    };

    let qrcode_str = qrcode
        .render::<char>()
        .dark_color('#')
        .quiet_zone(false)
        .module_dimensions(2, 1)
        .build();
    return_c_str(qrcode_str)
}
