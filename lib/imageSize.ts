/** Citește lățimea și înălțimea dintr-un JPEG sau WebP, fără biblioteci externe. */
export function imageSize(buf: Uint8Array): { width: number; height: number; type: "jpg" | "webp" } | null {
  const u16be = (i: number) => (buf[i] << 8) | buf[i + 1];
  const u16le = (i: number) => buf[i] | (buf[i + 1] << 8);
  const u24le = (i: number) => buf[i] | (buf[i + 1] << 8) | (buf[i + 2] << 16);
  const ascii = (i: number, n: number) => String.fromCharCode(...buf.slice(i, i + n));

  // JPEG: căutăm segmentul SOF (C0–CF, fără C4, C8, CC).
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) return null;
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: u16be(i + 5), width: u16be(i + 7), type: "jpg" };
      }
      i += 2 + u16be(i + 2);
    }
    return null;
  }

  // WebP: RIFF....WEBP + VP8 / VP8L / VP8X.
  if (ascii(0, 4) === "RIFF" && ascii(8, 4) === "WEBP") {
    const chunk = ascii(12, 4);
    if (chunk === "VP8X") return { width: u24le(24) + 1, height: u24le(27) + 1, type: "webp" };
    if (chunk === "VP8 ") return { width: u16le(26) & 0x3fff, height: u16le(28) & 0x3fff, type: "webp" };
    if (chunk === "VP8L") {
      const b = buf.slice(21, 25);
      const width = 1 + (((b[1] & 0x3f) << 8) | b[0]);
      const height = 1 + (((b[3] & 0x0f) << 10) | (b[2] << 2) | ((b[1] & 0xc0) >> 6));
      return { width, height, type: "webp" };
    }
  }
  return null;
}
