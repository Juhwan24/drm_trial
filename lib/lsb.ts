import { PNG } from "pngjs";

const MARKER = [0xab, 0xcd];
const TOKEN_BYTES = 8;
const PAYLOAD_BITS = (MARKER.length + TOKEN_BYTES + 1) * 8; // 88


function crc8(bytes: number[]): number {
  let crc = 0;
  for (const b of bytes) {
    crc ^= b;
    for (let i = 0; i < 8; i++) {
      crc = crc & 0x80 ? ((crc << 1) ^ 0x07) & 0xff : (crc << 1) & 0xff;
    }
  }
  
  return crc;
}


function serialize(bytes: number[]): number[] {
  const bits: number[] = [];
  for (const byte of bytes) {
    for (let i = 7; i >= 0; i--) bits.push((byte >> i) & 1);
  }
  
  return bits;
}


function deserialize(bits: number[]): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) byte = (byte << 1) | bits[i + j];
    bytes.push(byte);
  }
  
  return bytes;
}


function buildPayload(tokenHex: string): number[] {
  const tokenBytes = Array.from(Buffer.from(tokenHex, "hex"));
  const checksum = crc8(tokenBytes);
  
  return serialize([...MARKER, ...tokenBytes, checksum]);
}


function parsePayload(bits: number[]): string {
  const bytes = deserialize(bits);
  const tokenBytes = bytes.slice(MARKER.length, MARKER.length + TOKEN_BYTES);
  
  return Buffer.from(tokenBytes).toString("hex");
}


function capacity(png: PNG): number {
  const samplesPerPixel = 3; // R, G, B (알파 채널 제외)
  
  return Math.floor((png.width * png.height * samplesPerPixel) / PAYLOAD_BITS);
}


function sampleOffset(slot: number): number {
  const pixelIndex = Math.floor(slot / 3);
  const channel = slot % 3;
  
  return pixelIndex * 4 + channel;
}


function encodeBit(png: PNG, slot: number, bit: number): void {
  const offset = sampleOffset(slot);
  png.data[offset] = (png.data[offset] & 0xfe) | bit;
}


function decodeBit(png: PNG, slot: number): number {
  const offset = sampleOffset(slot);
  
  return png.data[offset] & 1;
}


function softDecision(votes: number, repeats: number): number {
  return votes * 2 >= repeats ? 1 : 0;
}


export function generateToken(): string {
  
  const bytes = Array.from({ length: TOKEN_BYTES }, () =>
    Math.floor(Math.random() * 256),
  );
  return Buffer.from(bytes).toString("hex");
}


export function modulate(png: PNG, tokenHex: string): void {
  
    const payload = buildPayload(tokenHex);
  const repeats = capacity(png);

  let slot = 0;
  for (let r = 0; r < repeats; r++) {
    for (const bit of payload) {
      encodeBit(png, slot, bit);
      slot++;
    }
  }
}


export function demodulate(png: PNG): string {
 
  const repeats = capacity(png);
  const votes = new Array(PAYLOAD_BITS).fill(0);

  let slot = 0;
  for (let r = 0; r < repeats; r++) {
    for (let i = 0; i < PAYLOAD_BITS; i++) {
      votes[i] += decodeBit(png, slot);
      slot++;
    }
  }


  const bits = votes.map((v) => softDecision(v, repeats));
  return parsePayload(bits);
}