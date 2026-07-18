import fs from "fs";
import path from "path";
import { PNG } from "pngjs";
import { generateToken, modulate, demodulate } from "@/lib/lsb";


export default async function TestLsbPage() {
  const imagePath = path.join(process.cwd(), "public", "image1.png");
  const originalBuffer = fs.readFileSync(imagePath);

  const png = PNG.sync.read(originalBuffer);
  const token = generateToken();
  
  modulate(png, token);

  const watermarkedBuffer = PNG.sync.write(png);
  const rereadPng = PNG.sync.read(watermarkedBuffer);
  const extracted = demodulate(rereadPng);


  return (
    <main style={{ padding: 24, fontFamily: "monospace" }}>
      <h1>lsb 테스트</h1>
      <p>before: {token}</p>
      <p>atfer: {extracted}</p>
      <p style={{ fontWeight: "bold" }}>
        {extracted === token ? "일치" : "불일치"}
      </p>
    </main>
  );
}
