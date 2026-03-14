export type Lake = {
  id: string;
  name: string;
  state: string;
  acres: string;
  maxDepth: string;
  county: string;
  lat: number;
  lon: number;
  usgsSiteId: string | null; // USGS gauge site near the lake
  biteLevel: number;
  species: string[];
  reports: LakeReport[];
  tackle: LakeTackle[];
};

export type LakeReport = {
  id: number;
  user: string;
  ago: string;
  species: string;
  technique: string;
  depth: string;
  rating: number;
  notes: string;
};

export type LakeTackle = {
  id: number;
  name: string;
  brand: string;
  price: string;
  rating: number;
  reviews: number;
  reason: string;
  affiliateUrl: string;
};

export const lakes: Record<string, Lake> = {
  "1": {
    id: "1",
    name: "Lake Tenkiller",
    state: "OK",
    acres: "12,900",
    maxDepth: "180ft",
    county: "Cherokee / Sequoyah",
    lat: 35.6,
    lon: -95.0,
    usgsSiteId: "07197000", // Illinois River below Tenkiller Ferry Dam
    biteLevel: 4,
    species: ["Largemouth Bass", "Smallmouth Bass", "Crappie", "Catfish", "Walleye"],
    reports: [
      {
        id: 1,
        user: "TroublinTrout",
        ago: "2h ago",
        species: "Bass",
        technique: "Topwater frogs",
        depth: "2–4ft",
        rating: 4,
        notes: "Schooling on the north end near the bluffs. Top frogs working great at first light. Missed a lot but landed 6 keeper bass.",
      },
      {
        id: 2,
        user: "OkieBasser",
        ago: "Yesterday",
        species: "Largemouth Bass",
        technique: "Swimbait slow roll",
        depth: "8–12ft",
        rating: 3,
        notes: "Decent afternoon bite on the main lake points. Water clearing up after last week's rain.",
      },
    ],
    tackle: [
      { id: 1, name: "BOOYAH Pad Crasher Frog", brand: "BOOYAH", price: "$8.99", rating: 4.7, reviews: 1243, reason: "Bass hitting topwater frogs right now", affiliateUrl: "#" },
      { id: 2, name: "Zoom Horny Toad", brand: "Zoom", price: "$5.49", rating: 4.5, reviews: 891, reason: "Walking bait producing in the shallows", affiliateUrl: "#" },
      { id: 3, name: "Strike King KVD 1.5 Crankbait", brand: "Strike King", price: "$11.49", rating: 4.8, reviews: 876, reason: "Reaction bite on the main lake points", affiliateUrl: "#" },
    ],
  },
  "2": {
    id: "2",
    name: "Grand Lake",
    state: "OK",
    acres: "46,500",
    maxDepth: "120ft",
    county: "Delaware / Mayes / Ottawa",
    lat: 36.5,
    lon: -95.0,
    usgsSiteId: "07185000", // Neosho River at Commerce
    biteLevel: 5,
    species: ["Largemouth Bass", "Crappie", "Walleye", "Catfish", "White Bass"],
    reports: [
      {
        id: 1,
        user: "OkieFisher",
        ago: "4h ago",
        species: "Crappie",
        technique: "1/8oz tube jigs",
        depth: "12–18ft",
        rating: 5,
        notes: "Limits in 2 hours drifting the main channel near the bridge. Pink/chartreuse working best.",
      },
    ],
    tackle: [
      { id: 1, name: "Bobby Garland Crappie Baby", brand: "Bobby Garland", price: "$4.99", rating: 4.6, reviews: 2104, reason: "Crappie crushing jigs right now", affiliateUrl: "#" },
      { id: 2, name: "Southern Pro Tube Jig 1/8oz", brand: "Southern Pro", price: "$3.99", rating: 4.4, reviews: 654, reason: "Matching the hatch at 12–18ft", affiliateUrl: "#" },
    ],
  },
  "3": {
    id: "3",
    name: "Keystone Lake",
    state: "OK",
    acres: "26,000",
    maxDepth: "60ft",
    county: "Pawnee / Osage / Tulsa",
    lat: 36.14,
    lon: -96.3,
    usgsSiteId: "07164500", // Arkansas River below Keystone Dam
    biteLevel: 3,
    species: ["Catfish", "Largemouth Bass", "Sand Bass", "Crappie"],
    reports: [
      {
        id: 1,
        user: "CatDaddy99",
        ago: "6h ago",
        species: "Catfish",
        technique: "Cut shad, bottom rig",
        depth: "20ft",
        rating: 3,
        notes: "Slow but steady. 3 fish over 8lbs in the evening bite. Set up near the old river channel.",
      },
    ],
    tackle: [
      { id: 1, name: "Berkley Gulp! Catfish Dough", brand: "Berkley", price: "$6.99", rating: 4.4, reviews: 543, reason: "Catfish biting on bottom rigs", affiliateUrl: "#" },
      { id: 2, name: "Eagle Claw Kahle Hook 3/0", brand: "Eagle Claw", price: "$4.49", rating: 4.6, reviews: 1876, reason: "Standard bottom rig setup", affiliateUrl: "#" },
    ],
  },
  "4": {
    id: "4",
    name: "Lake Eufaula",
    state: "OK",
    acres: "102,000",
    maxDepth: "55ft",
    county: "McIntosh / Pittsburg / Haskell",
    lat: 35.3,
    lon: -95.4,
    usgsSiteId: "07249985", // Canadian River near Eufaula
    biteLevel: 3,
    species: ["Largemouth Bass", "Crappie", "Catfish", "White Bass"],
    reports: [],
    tackle: [
      { id: 1, name: "Rapala Original Floater", brand: "Rapala", price: "$9.99", rating: 4.7, reviews: 3421, reason: "Classic producer on Eufaula", affiliateUrl: "#" },
    ],
  },
  "5": {
    id: "5",
    name: "Fort Gibson Lake",
    state: "OK",
    acres: "19,200",
    maxDepth: "85ft",
    county: "Cherokee / Wagoner / Muskogee",
    lat: 35.87,
    lon: -95.2,
    usgsSiteId: "07196500", // Grand River near Langley
    biteLevel: 2,
    species: ["Largemouth Bass", "Crappie", "Catfish"],
    reports: [],
    tackle: [
      { id: 1, name: "Strike King Red Eye Shad", brand: "Strike King", price: "$8.49", rating: 4.5, reviews: 987, reason: "Lipless crank working in cooler water", affiliateUrl: "#" },
    ],
  },
};
