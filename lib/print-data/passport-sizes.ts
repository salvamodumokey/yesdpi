export interface PassportPhotoSize {
  name: string;
  widthMm: number;
  heightMm: number;
}

/**
 * Common official photo dimensions. Requirements vary by issuing authority
 * and can change — always confirm the current requirement for your
 * application before printing.
 */
export const PASSPORT_PHOTO_SIZES: PassportPhotoSize[] = [
  { name: "US Passport / Visa (2 × 2 in)", widthMm: 51, heightMm: 51 },
  { name: "UK Passport", widthMm: 35, heightMm: 45 },
  { name: "EU / Schengen Visa", widthMm: 35, heightMm: 45 },
  { name: "India Passport", widthMm: 35, heightMm: 45 },
  { name: "Canada Passport", widthMm: 50, heightMm: 70 },
  { name: "China Visa", widthMm: 33, heightMm: 48 },
  { name: "Australia Passport", widthMm: 35, heightMm: 45 },
  { name: "Japan Visa / Passport", widthMm: 35, heightMm: 45 },
];
