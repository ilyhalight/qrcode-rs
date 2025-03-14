import { bench, run, summary } from "mitata";

import { qrcode } from "../pkg";
import QRCode from "qrcode";
import init, { qr_svg, SvgOptions } from "fast_qr";
import { writeBarcode } from "zxing-wasm/writer";

const data = "Hello world!";

summary(() => {
  bench("qrcode-rs", () => qrcode(data));
  bench("fast_qr", async () => {
    const options = new SvgOptions();
    const result = qr_svg(data, options);
    return `data:image/svg+xml,${encodeURIComponent(result)}`;
  });
  bench("qrcode-node", async () => await QRCode.toDataURL(data));
  bench("zxing-wasm", async () => {
    const { svg } = await writeBarcode(data, {
      format: "QRCode",
    });

    return `data:image/svg+xml;base64,${encodeURIComponent(svg)}`;
  });
});

await init();

await run();
