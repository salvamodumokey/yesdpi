export interface PosterSize {
  name: string;
  widthIn: number;
  heightIn: number;
}

export const POSTER_SIZES: PosterSize[] = [
  { name: "11 × 17 in (Tabloid)", widthIn: 11, heightIn: 17 },
  { name: "12 × 18 in", widthIn: 12, heightIn: 18 },
  { name: "16 × 20 in", widthIn: 16, heightIn: 20 },
  { name: "18 × 24 in", widthIn: 18, heightIn: 24 },
  { name: "24 × 36 in", widthIn: 24, heightIn: 36 },
  { name: "27 × 40 in (Movie one-sheet)", widthIn: 27, heightIn: 40 },
  { name: "A3 (11.7 × 16.5 in)", widthIn: 11.7, heightIn: 16.5 },
  { name: "A2 (16.5 × 23.4 in)", widthIn: 16.5, heightIn: 23.4 },
  { name: "A1 (23.4 × 33.1 in)", widthIn: 23.4, heightIn: 33.1 },
];
