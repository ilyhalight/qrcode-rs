import { bench, run, summary } from "mitata";

import { qrcode } from "../pkg";
import QRCode from "qrcode";
import init, { qr_svg, SvgOptions } from "fast_qr";
import { writeBarcodeToImageFile } from "zxing-wasm/writer";

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
    const writeOutput = await writeBarcodeToImageFile(data, {
      format: "QRCode",
    });

    const blob = writeOutput.image;
    const buffer = Buffer.from(await blob.arrayBuffer());
    return `data:${blob.type};base64,${buffer.toString("base64")}`;
  });
});

await init();

await run();
