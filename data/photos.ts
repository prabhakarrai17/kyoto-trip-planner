// Sample photos from Wikimedia Commons, all CC0 or public domain.
// They show the area or the kind of thing, not the actual listing: the content
// pack has no listing photos because image rights aren't cleared yet.
// Rows without a fitting free photo (S3, E2) keep the placeholder box.

export type Photo = {
  src: string;
  alt: string;
  title: string;
  author: string;
  license: "CC0" | "Public domain";
  sourceUrl: string;
};

export const photos: Record<string, Photo> = {
  S1: {
    src: "/images/stay-s1-gion-street.jpg",
    alt: "A quiet Gion street of wooden townhouses at night",
    title: "Streets of Gion, Kyoto",
    author: "lumoplank",
    license: "CC0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Streets_of_Gion,_Kyoto_-_Gion7708.jpg",
  },
  S2: {
    src: "/images/stay-s2-kamo-river.jpg",
    alt: "Wooden riverside terraces along the Kamo River",
    title: "Kyoto Kamogawa Noryo-Yuka",
    author: "MaedaAkihiko",
    license: "CC0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kyoto_Kamogawa_Noryo-Yuka.jpg",
  },
  S4: {
    src: "/images/stay-s4-tatami-room.jpg",
    alt: "A tatami room with paper screens and a garden window",
    title: "Washitsu in Toki-ke house",
    author: "妖精書士",
    license: "CC0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Washitsu_in_Toki-ke_house.jpg",
  },
  E1: {
    src: "/images/exp-e1-tea-ceremony.jpg",
    alt: "Historic photo of a tea ceremony in a tatami room",
    title: "The Chanoyu, or Japanese tea ceremony",
    author: "Unknown (via DPLA)",
    license: "Public domain",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:The_Chanoyu,_or_Japanese_tea_ceremony_-_DPLA_-_e9f081159c1b2718cd00b211a41071c9.jpg",
  },
  E3: {
    src: "/images/exp-e3-fushimi-inari.jpg",
    alt: "Orange torii gates over a stone path in the woods at Fushimi Inari",
    title: "Fushimi Inari Torii",
    author: "Balon Greyjoy",
    license: "CC0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:20181110_Fushimi_Inari_Torii_10.jpg",
  },
  E4: {
    src: "/images/exp-e4-kiyomizu-bowl.jpg",
    alt: "A hand-painted Kiyomizu ware bowl with blue flowers",
    title: "Openwork Hexagonal Ko-Kiyomizu Ware Bowl",
    author: "Daderot",
    license: "CC0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Openwork_Hexagonal_Ko-Kiyomizu_Ware_Bowl,_c._1731-1752,_Japan,_artist_unknown,_stoneware_with_overglaze_enamels_-_Art_Institute_of_Chicago_-_DSC00215.JPG",
  },
  F1: {
    src: "/images/food-f1-ramen.jpg",
    alt: "A bowl of soy ramen with pork, egg and spring onion",
    title: "Ramen and Chahan",
    author: "Akahito Yamabe",
    license: "CC0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ramen_and_Chahan.jpg",
  },
  F2: {
    src: "/images/food-f2-tofu.jpg",
    alt: "A block of fresh tofu on a bamboo mat",
    title: "Japanese tofu",
    author: "Ocdp",
    license: "CC0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Japanese_tofu_001.jpg",
  },
  F3: {
    src: "/images/food-f3-skewers.jpg",
    alt: "Grilled chicken skewers on a grill",
    title: "Yakitori",
    author: "Fg2",
    license: "Public domain",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:YakitoriM0826.jpg",
  },
  F4: {
    src: "/images/food-f4-set-meal.jpg",
    alt: "A Japanese set meal on a tray with tempura, rice and soup",
    title: "Kaiseki-style set meal",
    author: "Htheword",
    license: "CC0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:IMG-2023-12-2-kaisekifuuteishoku.jpg",
  },
};
