import { POSTER_SIZES } from "./poster-sizes";

export interface SizeTemplate {
  name: string;
  widthIn: number;
  heightIn: number;
}

export interface SizeTemplateGroup {
  category: string;
  sizes: SizeTemplate[];
}

export const PRINT_SIZE_TEMPLATE_GROUPS: SizeTemplateGroup[] = [
  {
    category: "Standard photo prints",
    sizes: [
      { name: "4 × 6 in", widthIn: 4, heightIn: 6 },
      { name: "5 × 7 in", widthIn: 5, heightIn: 7 },
      { name: "8 × 10 in", widthIn: 8, heightIn: 10 },
      { name: "11 × 14 in", widthIn: 11, heightIn: 14 },
    ],
  },
  {
    category: "Square prints (Instagram-style)",
    sizes: [
      { name: "8 × 8 in", widthIn: 8, heightIn: 8 },
      { name: "10 × 10 in", widthIn: 10, heightIn: 10 },
      { name: "12 × 12 in", widthIn: 12, heightIn: 12 },
    ],
  },
  {
    category: "Posters & wall art",
    sizes: POSTER_SIZES.map((p) => ({ name: p.name, widthIn: p.widthIn, heightIn: p.heightIn })),
  },
  {
    category: "Greeting cards & prints",
    sizes: [
      { name: "5 × 7 in card", widthIn: 5, heightIn: 7 },
      { name: "4 × 6 in postcard", widthIn: 4, heightIn: 6 },
    ],
  },
  {
    category: "Canvas prints",
    sizes: [
      { name: "8 × 10 in canvas", widthIn: 8, heightIn: 10 },
      { name: "16 × 20 in canvas", widthIn: 16, heightIn: 20 },
      { name: "24 × 36 in canvas", widthIn: 24, heightIn: 36 },
    ],
  },
  {
    category: "Business print",
    sizes: [
      { name: "Business card (3.5 × 2 in)", widthIn: 3.5, heightIn: 2 },
      { name: "Postcard (4 × 6 in)", widthIn: 4, heightIn: 6 },
      { name: "Flyer / Letter (8.5 × 11 in)", widthIn: 8.5, heightIn: 11 },
    ],
  },
];
