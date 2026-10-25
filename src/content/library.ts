import type { NetworkId } from "@/components/networks-data";

/**
 * Posts made in the Tessila Studio for fictional example brands (no real companies). Each image lives in
 * public/posts/{id}-{format}.webp; every post has a 4:5 file, and a few also have 9:16 and 1:1.
 */
export type BrandId =
  | "grao"
  | "pulso"
  | "lume"
  | "bicho"
  | "agulha"
  | "horta"
  | "rotalis"
  | "segunda"
  | "doce"
  | "raio"
  | "eixo"
  | "ponte"
  | "pula"
  | "moura"
  | "prumo"
  | "talhe"
  | "forma"
  | "ecoa"
  | "dorme"
  | "cabine"
  | "paginasete"
  | "raiz"
  | "compasso"
  | "andar9"
  | "tessila"
  | "sorrir"
  | "brasa"
  | "maofirme"
  | "lenteclara";

export const BRAND_NAMES: Record<BrandId, string> = {
  grao: "Grão da Rua",
  pulso: "Pulso",
  lume: "Lume",
  bicho: "Bicho Manso",
  agulha: "Agulha Fina",
  horta: "Horta Viva",
  rotalis: "Rotalis",
  segunda: "Segunda Volta",
  doce: "Doce Quintal",
  raio: "Raio 26",
  eixo: "Eixo",
  ponte: "Ponte",
  pula: "Pula Pula Festas",
  moura: "Moura Teles Advocacia",
  prumo: "Prumo Contabilidade",
  talhe: "Talhe",
  forma: "Fôrma Arquitetura",
  ecoa: "Ecoa",
  dorme: "Dorme",
  cabine: "Cabine",
  paginasete: "Página Sete",
  raiz: "Raiz Urbana",
  compasso: "Compasso",
  andar9: "Andar 9",
  tessila: "Tessila",
  sorrir: "Sorrir Leve",
  brasa: "Brasa 22",
  maofirme: "Mão Firme",
  lenteclara: "Lente Clara",
};

/** `bilingual`: the post has a Portuguese and an English file, and the page shows the one in its language. */
export type Post = { id: string; brand: BrandId; bilingual?: boolean };
export type Format = "4x5" | "9x16" | "1x1";

/** The hero's three drifting columns: one post per brand, each in its own style. */
export const WALL: Post[][] = [
  [
    { id: "11b99bf0", brand: "talhe" },
    { id: "da0853ea", brand: "paginasete", bilingual: true },
    { id: "55463204", brand: "tessila", bilingual: true },
    { id: "63b3ea9e", brand: "forma", bilingual: true },
    { id: "04dbabcb", brand: "brasa", bilingual: true },
  ],
  [
    { id: "7e0389fd", brand: "lenteclara", bilingual: true },
    { id: "fab1e0f3", brand: "raiz", bilingual: true },
    { id: "13d1dea6", brand: "cabine", bilingual: true },
    { id: "a035092c", brand: "sorrir", bilingual: true },
    { id: "d3194f1d", brand: "andar9", bilingual: true },
  ],
  [
    { id: "19507b22", brand: "dorme", bilingual: true },
    { id: "0acddaa7", brand: "compasso", bilingual: true },
    { id: "205d2269", brand: "bicho", bilingual: true },
    { id: "52677023", brand: "maofirme", bilingual: true },
    { id: "d9ba24b5", brand: "horta", bilingual: true },
  ],
];

/** What a post is for, as in the product: grow the audience, build trust, or get people to act. */
export type Goal = "audience" | "trust" | "action";
export type CreationBrand = "lume" | "grao" | "pulso" | "talhe" | "forma";

/**
 * Six posts per example brand: the same identity (the brand's own references), different requests and goals. The
 * second post of each brand is another design for the first one's request.
 */
export const CREATION: { brand: CreationBrand; posts: { id: string; goal: Goal; sameAsFirst?: true }[] }[] = [
  {
    brand: "lume",
    posts: [
      { id: "33ab3bf2", goal: "action" },
      { id: "739ecc54", goal: "action", sameAsFirst: true },
      { id: "17e9c4cb", goal: "audience" },
      { id: "cb847437", goal: "trust" },
      { id: "c10a43db", goal: "trust" },
      { id: "be986e23", goal: "action" },
    ],
  },
  {
    brand: "grao",
    posts: [
      { id: "86f411f6", goal: "action" },
      { id: "91c3d5fb", goal: "action", sameAsFirst: true },
      { id: "eeec5876", goal: "audience" },
      { id: "1d1f21f3", goal: "audience" },
      { id: "ed3cdee6", goal: "trust" },
      { id: "adb92808", goal: "action" },
    ],
  },
  {
    brand: "pulso",
    posts: [
      { id: "284406ef", goal: "action" },
      { id: "ef9abbbf", goal: "action", sameAsFirst: true },
      { id: "42271aee", goal: "audience" },
      { id: "f1727c98", goal: "trust" },
      { id: "67b46d2f", goal: "trust" },
      { id: "dc6dae98", goal: "action" },
    ],
  },
  {
    brand: "talhe",
    posts: [
      { id: "7dd2ab3c", goal: "action" },
      { id: "d3ec3ebc", goal: "action", sameAsFirst: true },
      { id: "1a30282f", goal: "audience" },
      { id: "afd452da", goal: "trust" },
      { id: "b3cb107e", goal: "trust" },
      { id: "5ec4edbb", goal: "action" },
    ],
  },
  {
    brand: "forma",
    posts: [
      { id: "2eabd6e3", goal: "trust" },
      { id: "e11690a0", goal: "trust", sameAsFirst: true },
      { id: "3ff63520", goal: "audience" },
      { id: "69b854fe", goal: "audience" },
      { id: "368f0d3c", goal: "trust" },
      { id: "bc6892ae", goal: "action" },
    ],
  },
];

/** The post shown on every network, in its three formats. */
export const NETWORK_POST: Post = { id: "a7529e89", brand: "ecoa" };

/** The post open in the editor, and where each layer sits in each format (percent of the artwork). */
export const EDITOR_POST: Post = { id: "825908ce", brand: "agulha" };
export type Layer = "title" | "art" | "date" | "price" | "background";
export const EDITOR_BOXES: Record<Format, Record<Layer, [x: number, y: number, w: number, h: number]>> = {
  "4x5": { title: [5, 12, 47, 33], art: [50, 16, 44, 41], date: [5, 59, 36, 16], price: [56, 59, 27, 19], background: [0, 0, 100, 100] },
  "9x16": { title: [4, 10, 55, 26], art: [37, 19, 59, 42], date: [4, 57, 39, 13], price: [4, 70, 31, 15], background: [0, 0, 100, 100] },
  "1x1": { title: [5, 14, 43, 37], art: [54, 13, 41, 45], date: [5, 56, 33, 18], price: [57, 56, 27, 21], background: [0, 0, 100, 100] },
};

/** The review queue: who posts, where, and when it would go out (day 0 is Monday). */
export const APPROVAL: { post: Post; network: NetworkId; day: number; time: string }[] = [
  { post: { id: "6d583126", brand: "segunda" }, network: "instagram", day: 4, time: "20:00" },
  { post: { id: "0c1ffaf1", brand: "forma" }, network: "linkedin", day: 1, time: "10:30" },
  { post: { id: "4952f159", brand: "horta" }, network: "facebook", day: 2, time: "09:00" },
  { post: { id: "53a3c34c", brand: "raio" }, network: "tiktok", day: 5, time: "11:00" },
];

/** Already on this week's calendar before the review. */
export const CALENDAR_START: { post: Post; network: NetworkId; day: number; time: string; published: boolean }[] = [
  { post: { id: "8b04047f", brand: "pulso" }, network: "instagram", day: 0, time: "12:00", published: true },
  { post: { id: "825908ce", brand: "agulha" }, network: "tiktok", day: 3, time: "18:00", published: false },
];

/** One example account's posts, one a week, marked on the results chart. */
export const RESULTS_POSTS: string[] = ["f0459d13", "9154aaa0", "76b3249e", "7f47797b", "5aab872c", "8e80d5ee", "13a0d59a", "e23e4ad8"];

/** The closing hand: five whole posts fanned like cards, none shown elsewhere on the page. */
export const CLOSING_POSTS: Post[] = [
  { id: "10ce58de", brand: "lenteclara", bilingual: true },
  { id: "2ba1aec7", brand: "lume", bilingual: true },
  { id: "7dc0bb47", brand: "tessila", bilingual: true },
  { id: "a93ce899", brand: "grao", bilingual: true },
  { id: "dd3dc558", brand: "grao", bilingual: true },
];

/** Weekly values for the results chart, one series per goal (example data). */
export const RESULTS_SERIES: Record<"audience" | "trust" | "demand", number[]> = {
  audience: [1840, 1905, 1990, 2120, 2210, 2390, 2580, 2960],
  trust: [86, 94, 120, 131, 158, 166, 201, 238],
  demand: [34, 41, 39, 58, 66, 81, 95, 112],
};
