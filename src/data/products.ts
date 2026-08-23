/**
 * SHUBHPATRA — central product catalogue.
 *
 * HOW TO EDIT
 * -----------
 * Everything the site shows comes from this file. To add a product, append an
 * object to the relevant array. To remove one, delete its object. The UI reads
 * these arrays generically, so a catalogue of 40, 100 or 500 designs needs no
 * UI changes (grids, search, filters, sorting and Load More adapt automatically).
 *
 * Images: drop a file in `src/assets/` and `import` it at the top of this file,
 * or paste any absolute image URL as a string.
 */

import { topUpSubcategory, TARGET_PER_SUBCATEGORY } from "./design-generator";
import { generateDesignSvg } from "@/lib/design-svg";

import digitalImg from "@/assets/cat-digital.jpg";
import stationeryImg from "@/assets/cat-stationery.jpg";
import videoImg from "@/assets/cat-video.jpg";
import physicalImg from "@/assets/cat-physical.jpg";
import cardGreenImg from "@/assets/card-green.jpg";
import heroImg from "@/assets/hero-invitation.jpg";

export type CategoryId = "digital" | "stationery" | "video" | "cards" | "logo";

export interface BaseProduct {
  /** Unique, stable slug — also the product page URL. */
  id: string;
  title: string;
  /** Small label above the title, e.g. the design family. */
  collection?: string;
  /** Display price, written exactly as it should appear. */
  price: string;
  /** Numeric value used for sorting + price filters. */
  priceValue?: number;
  image: string;
  /** Extra images shown as thumbnails on the product page. */
  gallery?: string[];
  description: string;
  /** Bullet points shown on the product page. */
  details: string[];
  /** Specification rows, e.g. { label: "Size", value: "5×7 in" }. */
  specs?: { label: string; value: string }[];
  /** Feature bullets. Falls back to `details` when omitted. */
  features?: string[];
  /** Delivery/turnaround note. Falls back to `defaultDelivery`. */
  delivery?: string;
  /** Personalisation note. Falls back to `defaultCustomization`. */
  customization?: string;
  /** Top-level category this design belongs to. */
  category: CategoryId;
  /** Group inside a category, e.g. "Path & Pooja". */
  group?: string;
  /** Subcategory, e.g. "Ganesh Pooja" — drives catalogue filters. */
  subcategory?: string;
  /** Occasion tag used by the Physical Cards filters. */
  occasion?: string;
  /** Free-form search tags (style, colour, motif…) — matched by catalogue search. */
  tags?: string[];
}

export interface VideoProduct extends BaseProduct {
  /** MP4/WebM file URL, or a YouTube/Vimeo embed URL. */
  videoUrl: string;
  /** Poster/thumbnail image shown before playback. */
  poster: string;
  /** Duration label, e.g. "0:45". */
  duration: string;
  /** Frame shape of the film. Defaults to "landscape". */
  orientation?: "landscape" | "portrait" | "square";
}

export interface CardProduct extends BaseProduct {
  /** Used by the catalogue filters. */
  style: string;
  colour: string;
  material?: string;
  size?: string;
  /** Set to false to show the card as made-to-order. */
  available?: boolean;
}

/**
 * Fallbacks used by the product page whenever a product does not define its
 * own `delivery` / `customization` text. Edit once, applies everywhere.
 */
export const defaultDelivery =
  "Digital designs are delivered as files/links within 2–3 working days of approval. Printed orders are dispatched from Delhi in 8–12 working days after proof approval.";
export const defaultCustomization =
  "Names, dates, ceremonies, languages, colours and motifs are fully customisable. Share your details on WhatsApp and we send a personalised proof.";

export const brand = {
  name: "SHUBHPATRA",
  tagline: "Wedding invites & stationery",
  owner: "Mustaqim",
  whatsapp: "919958577919",
  phone: "+91 99585 77919",
  email: "hello@shubhpatra.in",
  city: "Delhi",
  hours: "10 AM – 6 PM (Mon–Sat)",
  instagram: "https://instagram.com",
  heroImage: heroImg,
};

/* ------------------------------------------------------------------ */
/* CATEGORY + SUBCATEGORY TAXONOMY (from the client brief)             */
/* ------------------------------------------------------------------ */

export interface CategoryDef {
  id: CategoryId;
  name: string;
  /** Route the category card / navigation links to. */
  href: string;
  blurb: string;
  image: string;
  count: string;
}

export const categories: CategoryDef[] = [
  {
    id: "digital",
    name: "Digital Invite",
    href: "/digital-invite",
    blurb:
      "Wedding invitation PDFs, video invites, path & pooja, kids celebrations and digital stationery.",
    image: digitalImg,
    count: "Delivered in 48 hours",
  },
  {
    id: "stationery",
    name: "Stationery",
    href: "/stationery",
    blurb:
      "Signages, welcome notes, menus, itineraries, money envelopes, tags and wedding scrolls.",
    image: stationeryImg,
    count: "Print & foil finishes",
  },
  {
    id: "video",
    name: "Video Invitations",
    href: "/#video",
    blurb: "Animated invitation films for save the date, wedding and ring ceremony.",
    image: videoImg,
    count: "Square 1:1 previews",
  },
  {
    id: "cards",
    name: "Physical Cards",
    href: "/physical-cards",
    blurb: "Printed invitation cards — boxes, laser-cut covers, foil press and scrolls.",
    image: physicalImg,
    count: "Growing catalogue",
  },
];

/** Digital Invite groups and their subcategories, exactly as per the brief. */
export const digitalGroups: { group: string; subcategories: string[] }[] = [
  {
    group: "Wedding Invitation PDF",
    subcategories: ["Save the Date", "Roka Ceremony", "Engagement", "Wedding Invite"],
  },
  {
    group: "Video Invite",
    subcategories: ["Save the Date", "Wedding", "Ring Ceremony / Engagement"],
  },
  {
    group: "Path & Pooja",
    subcategories: [
      "Ganesh Pooja",
      "Mata Ki Chowki",
      "Grah Pravesh / House Warming",
      "Satsang",
      "Naming Ceremony",
      "Michachmi Dukhdum",
      "Satyanarayana Katha",
      "Sunder Kand Path",
    ],
  },
  {
    group: "Kids Celebration",
    subcategories: ["Baby Announcement", "Baby Birthday", "Baby Shower", "Naming Ceremony"],
  },
  { group: "Digital Stationery", subcategories: ["Wardrobe Planner"] },
];

/** Stationery subcategories, exactly as per the brief. */
export const stationerySubcategories = [
  "Wedding Signages Design",
  "Welcome Notes",
  "Money Envelope Designs",
  "Thankyou Notes",
  "Menu Cards",
  "Itinerary Designs",
  "Keyjackets",
  "Luggage Tags",
  "Hamper Tags",
  "Wedding Scrolls",
];

/** Physical Card occasion/subcategories — used for category navigation + generation. */
export const physicalCardSubcategories = [
  "Wedding Invite",
  "Engagement",
  "Reception",
  "Haldi",
  "Mehendi",
  "Sangeet",
  "Ring Ceremony",
  "Wedding Scrolls",
];

/** Digital Invite groups, excluding "Video Invite" (handled by `videoInvitations`). */
export const digitalCatalogueGroups = digitalGroups.filter((g) => g.group !== "Video Invite");

/* ------------------------------------------------------------------ */
/* 1. DIGITAL INVITATIONS (PDF / pooja / kids / digital stationery)    */
/* ------------------------------------------------------------------ */

/**
 * TO ADD A DESIGN: copy an object below, give it a unique `id`, set `group`
 * and `subcategory` to one of the values in `digitalGroups`, and you're done.
 * Placeholder imagery is used until the client shares the final artwork.
 */
export const digitalInvitations: BaseProduct[] = [
  {
    id: "dig-save-the-date",
    category: "digital",
    group: "Wedding Invitation PDF",
    subcategory: "Save the Date",
    collection: "Ivory Arch",
    title: "Save The Date Invitation PDF",
    price: "From ₹1,299",
    priceValue: 1299,
    image: digitalImg,
    description:
      "A single-page save the date PDF with an ivory arch, maroon script and fine botanical borders.",
    details: [
      "1 designed page, print + share ready PDF",
      "Custom names, date and hashtag",
      "Matching WhatsApp status crop",
      "2 revision rounds included",
    ],
    specs: [
      { label: "Format", value: "PDF + JPG" },
      { label: "Pages", value: "1" },
      { label: "Turnaround", value: "2–3 working days" },
    ],
  },
  {
    id: "dig-roka",
    category: "digital",
    group: "Wedding Invitation PDF",
    subcategory: "Roka Ceremony",
    collection: "Ivory Arch",
    title: "Roka Ceremony Invitation PDF",
    price: "From ₹1,299",
    priceValue: 1299,
    image: stationeryImg,
    description:
      "A warm ivory and brown roka invitation with space for both families and the ceremony timing.",
    details: ["1–2 designed pages", "Both family names", "Venue and timing panel"],
  },
  {
    id: "dig-engagement",
    category: "digital",
    group: "Wedding Invitation PDF",
    subcategory: "Engagement",
    collection: "Maroon Bloom",
    title: "Engagement Invitation PDF",
    price: "From ₹1,499",
    priceValue: 1499,
    image: physicalImg,
    description:
      "Maroon florals on ivory with a ring-ceremony header and elegant serif typography.",
    details: ["1–2 designed pages", "Ring ceremony motif", "Dress code panel optional"],
  },
  {
    id: "dig-wedding-suite",
    category: "digital",
    group: "Wedding Invitation PDF",
    subcategory: "Wedding Invite",
    collection: "Heritage",
    title: "Wedding Invitation PDF Suite",
    price: "From ₹3,499",
    priceValue: 3499,
    image: heroImg,
    description:
      "The centrepiece — a multi-page wedding invitation PDF with ceremony schedule, venue details and RSVP contact.",
    details: [
      "Up to 5 designed pages",
      "Ceremony-by-ceremony schedule",
      "Venue map / directions panel",
      "Print-ready and share-ready versions",
    ],
    specs: [
      { label: "Format", value: "PDF + JPG set" },
      { label: "Pages", value: "Up to 5" },
      { label: "Languages", value: "English, Hindi, Urdu + more" },
    ],
  },
  {
    id: "dig-ganesh-pooja",
    category: "digital",
    group: "Path & Pooja",
    subcategory: "Ganesh Pooja",
    collection: "Path & Pooja",
    title: "Ganesh Pooja Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: digitalImg,
    description: "A serene ivory invitation for Ganesh Pooja with a hand-drawn temple arch.",
    details: ["1 designed page", "Pooja timing and venue", "Same-day express option"],
  },
  {
    id: "dig-mata-ki-chowki",
    category: "digital",
    group: "Path & Pooja",
    subcategory: "Mata Ki Chowki",
    collection: "Path & Pooja",
    title: "Mata Ki Chowki Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: cardGreenImg,
    description: "Maroon and ivory chowki invitation with a soft gold border and diya motifs.",
    details: ["1 designed page", "Bhajan timing panel", "WhatsApp-optimised file size"],
  },
  {
    id: "dig-grah-pravesh",
    category: "digital",
    group: "Path & Pooja",
    subcategory: "Grah Pravesh / House Warming",
    collection: "Path & Pooja",
    title: "Grah Pravesh Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: physicalImg,
    description: "House-warming invitation with a doorway arch illustration and family name plate.",
    details: ["1 designed page", "Address and directions", "Optional map link"],
  },
  {
    id: "dig-satsang",
    category: "digital",
    group: "Path & Pooja",
    subcategory: "Satsang",
    collection: "Path & Pooja",
    title: "Satsang Invitation",
    price: "From ₹799",
    priceValue: 799,
    image: stationeryImg,
    description:
      "A calm, uncluttered satsang invitation in ivory with maroon devanagari typesetting.",
    details: ["1 designed page", "Hindi or English typesetting", "Timing and venue panel"],
  },
  {
    id: "dig-naming-ceremony-pooja",
    category: "digital",
    group: "Path & Pooja",
    subcategory: "Naming Ceremony",
    collection: "Path & Pooja",
    title: "Naming Ceremony Invitation (Pooja)",
    price: "From ₹899",
    priceValue: 899,
    image: heroImg,
    description:
      "Naming ceremony invitation with a gentle floral wreath and space for the baby's name.",
    details: ["1 designed page", "Baby name reveal panel", "2 revision rounds"],
  },
  {
    id: "dig-michachmi",
    category: "digital",
    group: "Path & Pooja",
    subcategory: "Michachmi Dukhdum",
    collection: "Path & Pooja",
    title: "Michachmi Dukhdum Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: digitalImg,
    description: "A traditional invitation layout for Michachmi Dukhdum in ivory and brown.",
    details: ["1 designed page", "Traditional layout", "Language of your choice"],
  },
  {
    id: "dig-satyanarayana-katha",
    category: "digital",
    group: "Path & Pooja",
    subcategory: "Satyanarayana Katha",
    collection: "Path & Pooja",
    title: "Satyanarayana Katha Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: cardGreenImg,
    description: "Katha invitation with kalash motifs, maroon headings and ivory ground.",
    details: ["1 designed page", "Kalash motif border", "Timing and prasad note"],
  },
  {
    id: "dig-sunder-kand",
    category: "digital",
    group: "Path & Pooja",
    subcategory: "Sunder Kand Path",
    collection: "Path & Pooja",
    title: "Sunder Kand Path Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: physicalImg,
    description: "Sunder Kand Path invitation with a restrained arch frame and devanagari heading.",
    details: ["1 designed page", "Devanagari heading", "Venue and timing panel"],
  },
  {
    id: "dig-baby-announcement",
    category: "digital",
    group: "Kids Celebration",
    subcategory: "Baby Announcement",
    collection: "Kids Celebration",
    title: "Baby Announcement Card",
    price: "From ₹799",
    priceValue: 799,
    image: stationeryImg,
    description: "A soft ivory announcement card with room for the baby's name, date and weight.",
    details: ["1 designed page", "Photo frame option", "Square and story crops"],
  },
  {
    id: "dig-baby-birthday",
    category: "digital",
    group: "Kids Celebration",
    subcategory: "Baby Birthday",
    collection: "Kids Celebration",
    title: "Baby Birthday Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: digitalImg,
    description:
      "A playful yet elegant birthday invitation with illustrated bunting in warm tones.",
    details: ["1 designed page", "Theme of your choice", "Photo insert option"],
  },
  {
    id: "dig-baby-shower",
    category: "digital",
    group: "Kids Celebration",
    subcategory: "Baby Shower",
    collection: "Kids Celebration",
    title: "Baby Shower Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: heroImg,
    description: "Baby shower / godh bharai invitation with a floral arch and ivory backdrop.",
    details: ["1 designed page", "Godh bharai wording option", "Games / gifting note"],
  },
  {
    id: "dig-kids-naming",
    category: "digital",
    group: "Kids Celebration",
    subcategory: "Naming Ceremony",
    collection: "Kids Celebration",
    title: "Naming Ceremony Invitation",
    price: "From ₹899",
    priceValue: 899,
    image: physicalImg,
    description: "Naming ceremony card for the family celebration, with a name-reveal panel.",
    details: ["1 designed page", "Name reveal panel", "Matching thank-you note option"],
  },
  {
    id: "dig-wardrobe-planner",
    category: "digital",
    group: "Digital Stationery",
    subcategory: "Wardrobe Planner",
    collection: "Digital Stationery",
    title: "Wedding Wardrobe Planner",
    price: "From ₹1,199",
    priceValue: 1199,
    image: cardGreenImg,
    description:
      "A designed wardrobe planner listing every function, outfit, jewellery and footwear note in one shareable file.",
    details: [
      "Function-by-function planner",
      "Outfit, jewellery and footwear columns",
      "Editable PDF + printable version",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 2. STATIONERY                                                       */
/* ------------------------------------------------------------------ */

export const stationery: BaseProduct[] = [
  {
    id: "sta-signage",
    category: "stationery",
    subcategory: "Wedding Signages Design",
    collection: "Entryway",
    title: "Wedding Signage Design",
    price: "From ₹2,400",
    priceValue: 2400,
    image: stationeryImg,
    description:
      "A sculpted arch-shaped signage design for entryways, in acrylic, mirror or board.",
    details: ["24×36 in standard", "Acrylic, mirror or MDF", "Print-ready artwork supplied"],
  },
  {
    id: "sta-welcome-note",
    category: "stationery",
    subcategory: "Welcome Notes",
    collection: "Hospitality",
    title: "Welcome Note",
    price: "From ₹85 / pc",
    priceValue: 85,
    image: heroImg,
    description: "A room-drop welcome note on textured ivory stock with maroon foiled heading.",
    details: ["Min. order 50 pcs", "Textured ivory stock", "Optional envelope"],
  },
  {
    id: "sta-money-envelope",
    category: "stationery",
    subcategory: "Money Envelope Designs",
    collection: "Shagun",
    title: "Money Envelope Design",
    price: "From ₹35 / pc",
    priceValue: 35,
    image: physicalImg,
    description: "Shagun envelopes with a fine botanical border and space for the family name.",
    details: ["Min. order 100 pcs", "Foil or flat print", "Standard note size"],
  },
  {
    id: "sta-thankyou-note",
    category: "stationery",
    subcategory: "Thankyou Notes",
    collection: "Farewell",
    title: "Thankyou Note",
    price: "From ₹95 / pc",
    priceValue: 95,
    image: stationeryImg,
    description: "Folded thank-you notes with matching lined envelopes and a wax seal option.",
    details: ["Matching envelope liner", "Wax seal with monogram", "Min. order 50 pcs"],
  },
  {
    id: "sta-menu-card",
    category: "stationery",
    subcategory: "Menu Cards",
    collection: "Tabletop",
    title: "Menu Card",
    price: "From ₹75 / pc",
    priceValue: 75,
    image: heroImg,
    description: "Textured stock menu cards with optional foil headings and deckled edges.",
    details: ["Min. order 50 pcs", "Hot-foil or letterpress", "Handmade paper option"],
  },
  {
    id: "sta-itinerary",
    category: "stationery",
    subcategory: "Itinerary Designs",
    collection: "Tabletop",
    title: "Itinerary Design",
    price: "From ₹110 / pc",
    priceValue: 110,
    image: cardGreenImg,
    description: "A function-wise itinerary card guests can keep in their room or bag.",
    details: ["Single or concertina fold", "Function-wise timeline", "Acrylic version available"],
  },
  {
    id: "sta-keyjacket",
    category: "stationery",
    subcategory: "Keyjackets",
    collection: "Hospitality",
    title: "Keyjacket",
    price: "From ₹60 / pc",
    priceValue: 60,
    image: digitalImg,
    description: "Hotel keycard jackets carrying the wedding monogram and guest name.",
    details: ["Fits standard keycards", "Monogram + guest name", "Min. order 100 pcs"],
  },
  {
    id: "sta-luggage-tag",
    category: "stationery",
    subcategory: "Luggage Tags",
    collection: "Hospitality",
    title: "Luggage Tag",
    price: "From ₹70 / pc",
    priceValue: 70,
    image: physicalImg,
    description: "Ribboned luggage tags for arriving guests, in ivory board or leatherette.",
    details: ["Ivory board or leatherette", "Ribbon or elastic loop", "Min. order 50 pcs"],
  },
  {
    id: "sta-hamper-tag",
    category: "stationery",
    subcategory: "Hamper Tags",
    collection: "Gifting",
    title: "Hamper Tag",
    price: "From ₹35 / pc",
    priceValue: 35,
    image: digitalImg,
    description: "Gift and hamper tags finished with silk ribbon for return gifts.",
    details: ["Silk or satin ribbon", "Foil or embossed", "Min. order 100 pcs"],
  },
  {
    id: "sta-wedding-scroll",
    category: "stationery",
    subcategory: "Wedding Scrolls",
    collection: "Heritage",
    title: "Wedding Scroll",
    price: "From ₹520",
    priceValue: 520,
    image: stationeryImg,
    description:
      "A printed scroll in a capped cylinder, tied with zari thread — for special guests.",
    details: ["Brass or wooden caps", "Silk or paper scroll", "Zari thread tie"],
  },
];

/* ------------------------------------------------------------------ */
/* 3. VIDEO INVITATIONS (a Digital Invite subcategory)                 */
/* ------------------------------------------------------------------ */

/** Subcategories: "Save the Date", "Wedding", "Ring Ceremony / Engagement". */
export const videoInvitations: VideoProduct[] = [
  {
    id: "vid-save-the-date-film",
    category: "video",
    group: "Video Invite",
    subcategory: "Save the Date",
    collection: "Save the Date",
    title: "Save The Date Teaser Film",
    price: "From ₹4,200",
    priceValue: 4200,
    image: cardGreenImg,
    poster: cardGreenImg,
    duration: "0:20",
    orientation: "landscape",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description:
      "A short, cinematic reveal of the date — ivory textures with maroon and soft gold typography.",
    details: ["20 seconds", "Reels-ready 9:16 version", "48-hour turnaround"],
  },
  {
    id: "vid-wedding-arch",
    category: "video",
    group: "Video Invite",
    subcategory: "Wedding",
    collection: "Wedding",
    title: "Wedding Invitation Film",
    price: "From ₹6,500",
    priceValue: 6500,
    image: videoImg,
    poster: videoImg,
    duration: "0:45",
    orientation: "landscape",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description:
      "An illuminated arch opens onto your names, with diyas, florals and a live instrumental score.",
    details: [
      "45–60 seconds, 1080p",
      "Original score",
      "Vertical + horizontal delivery",
      "3 revision rounds",
    ],
  },
  {
    id: "vid-ring-ceremony",
    category: "video",
    group: "Video Invite",
    subcategory: "Ring Ceremony / Engagement",
    collection: "Ring Ceremony",
    title: "Ring Ceremony Invitation Film",
    price: "From ₹5,400",
    priceValue: 5400,
    image: heroImg,
    poster: heroImg,
    duration: "0:35",
    orientation: "portrait",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description:
      "A vertical engagement film built for WhatsApp and Instagram, with ring motif animation.",
    details: ["Vertical 9:16 master", "Ring motif animation", "Voice-over option"],
  },
  {
    id: "vid-haldi-glow",
    category: "video",
    group: "Video Invite",
    subcategory: "Save the Date",
    collection: "Haldi Glow",
    title: "Haldi Ceremony Teaser Film",
    price: "From ₹3,800",
    priceValue: 3800,
    image: generateDesignSvg("vid-haldi-glow-poster"),
    poster: generateDesignSvg("vid-haldi-glow-poster"),
    duration: "0:18",
    orientation: "square",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description: "A sunlit, marigold-toned teaser announcing the haldi, built for Instagram.",
    details: ["18 seconds", "Square 1:1 master", "48-hour turnaround"],
  },
  {
    id: "vid-mehendi-motion",
    category: "video",
    group: "Video Invite",
    subcategory: "Wedding",
    collection: "Mehendi Motion",
    title: "Mehendi Invitation Film",
    price: "From ₹4,600",
    priceValue: 4600,
    image: generateDesignSvg("vid-mehendi-motion-poster"),
    poster: generateDesignSvg("vid-mehendi-motion-poster"),
    duration: "0:30",
    orientation: "square",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description: "Hand-drawn henna line art animates across a warm cream and gold backdrop.",
    details: ["30 seconds", "Square 1:1 master", "2 revision rounds"],
  },
  {
    id: "vid-sangeet-reveal",
    category: "video",
    group: "Video Invite",
    subcategory: "Wedding",
    collection: "Sangeet Reveal",
    title: "Sangeet Night Invitation Film",
    price: "From ₹5,200",
    priceValue: 5200,
    image: generateDesignSvg("vid-sangeet-reveal-poster"),
    poster: generateDesignSvg("vid-sangeet-reveal-poster"),
    duration: "0:32",
    orientation: "square",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description: "A festive gold-foil reveal announcing the sangeet, scored with live percussion.",
    details: ["32 seconds", "Square 1:1 master", "Original score"],
  },
  {
    id: "vid-reception-arch",
    category: "video",
    group: "Video Invite",
    subcategory: "Wedding",
    collection: "Reception Arch",
    title: "Reception Invitation Film",
    price: "From ₹5,800",
    priceValue: 5800,
    image: generateDesignSvg("vid-reception-arch-poster"),
    poster: generateDesignSvg("vid-reception-arch-poster"),
    duration: "0:40",
    orientation: "square",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description:
      "A grand illuminated arch parts to reveal the reception details, in gold and ivory.",
    details: ["40 seconds", "Square 1:1 master", "3 revision rounds"],
  },
  {
    id: "vid-ring-motion",
    category: "video",
    group: "Video Invite",
    subcategory: "Ring Ceremony / Engagement",
    collection: "Ring Motion",
    title: "Ring Ceremony Teaser Film",
    price: "From ₹4,900",
    priceValue: 4900,
    image: generateDesignSvg("vid-ring-motion-poster"),
    poster: generateDesignSvg("vid-ring-motion-poster"),
    duration: "0:24",
    orientation: "square",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description: "Two rings interlock in gold linework over a soft beige gradient.",
    details: ["24 seconds", "Square 1:1 master", "Voice-over option"],
  },
  {
    id: "vid-save-date-bloom",
    category: "video",
    group: "Video Invite",
    subcategory: "Save the Date",
    collection: "Lotus Bloom",
    title: "Save The Date Bloom Film",
    price: "From ₹4,000",
    priceValue: 4000,
    image: generateDesignSvg("vid-save-date-bloom-poster"),
    poster: generateDesignSvg("vid-save-date-bloom-poster"),
    duration: "0:22",
    orientation: "square",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description: "A lotus motif blooms open around the date, in cream, taupe and muted gold.",
    details: ["22 seconds", "Square 1:1 master", "48-hour turnaround"],
  },
  {
    id: "vid-baby-shower-bloom",
    category: "video",
    group: "Video Invite",
    subcategory: "Wedding",
    collection: "Baby Bloom",
    title: "Baby Shower Invitation Film",
    price: "From ₹3,600",
    priceValue: 3600,
    image: generateDesignSvg("vid-baby-shower-bloom-poster"),
    poster: generateDesignSvg("vid-baby-shower-bloom-poster"),
    duration: "0:20",
    orientation: "square",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    description: "A soft floral wreath frames the godh bharai details in ivory and gold.",
    details: ["20 seconds", "Square 1:1 master", "2 revision rounds"],
  },
];

/* ------------------------------------------------------------------ */
/* 4. PHYSICAL CARDS — add as many entries as you like                 */
/* ------------------------------------------------------------------ */

/**
 * TO ADD A CARD: copy this template to the end of the array below, give it a
 * unique `id`, and you're done — the grid, search, filters, sorting and
 * Load More all pick it up automatically. No UI file needs editing.
 *
 * {
 *   id: "pc-unique-slug",
 *   category: "cards",
 *   collection: "Heritage",         // design family
 *   subcategory: "Wedding Invite",  // optional
 *   title: "Card name",
 *   price: "₹450",
 *   priceValue: 450,                // number only — used for sort + price filter
 *   image: myImportedImage,         // or "https://…"
 *   gallery: [imgA, imgB],          // optional extra photos
 *   style: "Box Card",              // filter
 *   colour: "Ivory",                // filter
 *   occasion: "Wedding",            // filter
 *   material: "Velvet-wrapped rigid box",
 *   size: "6×9 in",
 *   description: "…",
 *   details: ["…", "…"],
 *   available: true,                // optional; false = made to order
 * }
 *
 * TO REMOVE A CARD: delete its object. TO CHANGE price/image/text: edit it here.
 */

export const physicalCards: CardProduct[] = [
  {
    id: "pc-heritage-velvet",
    category: "cards",
    collection: "Heritage",
    subcategory: "Wedding Invite",
    title: "Heritage Velvet Box Card",
    price: "₹450",
    priceValue: 450,
    image: cardGreenImg,
    style: "Box Card",
    colour: "Maroon",
    occasion: "Wedding",
    material: "Velvet-wrapped rigid board with laser-cut lid",
    size: "6×9 in box",
    description: "A velvet box with a laser-cut arch lid and ivory inserts.",
    details: [
      "Velvet-wrapped rigid box",
      "Laser-cut arch lid",
      "3 inserts + 2 envelopes",
      "Min. order 100 pcs",
    ],
  },
  {
    id: "pc-jaali-arch",
    category: "cards",
    collection: "Jaali",
    subcategory: "Wedding Invite",
    title: "Jaali Arch Laser-Cut Card",
    price: "₹280",
    priceValue: 280,
    image: physicalImg,
    style: "Laser Cut",
    colour: "Ivory",
    occasion: "Wedding",
    material: "300 gsm ivory board, laser-cut jaali cover",
    size: "5×7 in",
    description: "An ivory jaali screen folds open to reveal the invitation in foiled script.",
    details: ["Laser-cut jaali cover", "Foiled script", "Matching lined envelope"],
  },
  {
    id: "pc-ivory-foil",
    category: "cards",
    collection: "Heritage",
    subcategory: "Wedding Invite",
    title: "Ivory Hot-Foil Invitation",
    price: "₹210",
    priceValue: 210,
    image: heroImg,
    style: "Foil Press",
    colour: "Ivory",
    occasion: "Wedding",
    material: "300 gsm handmade cotton paper, hot foil",
    size: "5×7 in",
    description: "Handmade cotton paper with a hot-foiled arch and botanical line ornaments.",
    details: ["300 gsm handmade paper", "Hot foil", "Deckled edges"],
  },
  {
    id: "pc-scroll-invite",
    category: "cards",
    collection: "Heritage",
    subcategory: "Wedding Scrolls",
    title: "Silk Scroll Invitation",
    price: "₹520",
    priceValue: 520,
    image: stationeryImg,
    style: "Scroll",
    colour: "Ivory",
    occasion: "Wedding",
    material: "Silk scroll, brass-capped cylinder",
    size: "12 in scroll",
    description: "A silk scroll in a brass-capped cylinder, tied with zari thread.",
    details: ["Brass-capped cylinder", "Silk scroll print", "Zari thread tie"],
  },
  {
    id: "pc-maroon-gatefold",
    category: "cards",
    collection: "Heritage",
    subcategory: "Reception",
    title: "Maroon Gatefold Card",
    price: "₹340",
    priceValue: 340,
    image: cardGreenImg,
    style: "Gatefold",
    colour: "Maroon",
    occasion: "Reception",
    material: "350 gsm board, foil-pressed pillars, magnet close",
    size: "5.5×8 in",
    description: "Twin gatefold doors with foiled pillars opening to the main card.",
    details: ["Gatefold with magnet close", "Foiled pillars", "2 inserts included"],
  },
  {
    id: "pc-brown-minimal",
    category: "cards",
    collection: "Modern Minimal",
    subcategory: "Engagement",
    title: "Brown & Foil Minimal Card",
    price: "₹165",
    priceValue: 165,
    image: physicalImg,
    style: "Flat Card",
    colour: "Brown",
    occasion: "Engagement",
    material: "350 gsm board, single-colour foil",
    size: "5×7 in",
    description: "Warm brown board with a single foiled arch and letterpress typography.",
    details: ["350 gsm board", "Single-colour foil", "Min. order 100 pcs"],
  },
];

export const allProducts: BaseProduct[] = [
  ...digitalInvitations,
  ...stationery,
  ...videoInvitations,
  ...physicalCards,
];

/** Look up any product (any category) by its id — used by the product page. */
export function productById(id: string): BaseProduct | undefined {
  return allProducts.find((product) => product.id === id);
}

/** True when the product is a video invitation (has a playable file). */
export function isVideoProduct(product: BaseProduct): product is VideoProduct {
  return (product as VideoProduct).videoUrl !== undefined;
}

/* ------------------------------------------------------------------ */
/* CATALOGUE GENERATION — tops each subcategory up to a full, unique   */
/* set of designs on demand (see src/data/design-generator.ts).        */
/* ------------------------------------------------------------------ */

/** Base "from" price used when generating extra designs for a digital subcategory. */
function digitalBasePrice(subcategory: string): number {
  if (subcategory === "Wedding Invite") return 1799;
  if (subcategory === "Engagement" || subcategory === "Roka Ceremony") return 1499;
  if (subcategory === "Wardrobe Planner") return 899;
  return 1299;
}

/** Full, unique design set for one Digital Invite subcategory (curated + generated). */
export function digitalSubcategoryDesigns(group: string, subcategory: string): BaseProduct[] {
  return topUpSubcategory(digitalInvitations, {
    category: "digital",
    group,
    subcategory,
    basePrice: digitalBasePrice(subcategory),
    titleSuffix: "Invitation PDF",
  });
}

/** Full, unique design set for one Stationery subcategory (curated + generated). */
export function stationerySubcategoryDesigns(subcategory: string): BaseProduct[] {
  return topUpSubcategory(stationery, {
    category: "stationery",
    subcategory,
    basePrice: 220,
    titleSuffix: "Design",
  });
}

const CARD_STYLES = [
  "Box Card",
  "Laser Cut",
  "Foil Press",
  "Gatefold",
  "Flat Card",
  "Scroll",
] as const;
const CARD_COLOURS = ["Ivory", "Maroon", "Brown", "Gold", "Sand"] as const;

/** Full, unique design set for one Physical Cards subcategory (curated + generated). */
export function physicalCardSubcategoryDesigns(subcategory: string): CardProduct[] {
  return topUpSubcategory(physicalCards, {
    category: "cards",
    subcategory,
    basePrice: 220,
    titleSuffix: "Card",
    cardExtras: (seed) => {
      let h = 0;
      for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
      return {
        style: CARD_STYLES[h % CARD_STYLES.length]!,
        colour: CARD_COLOURS[(h >> 3) % CARD_COLOURS.length]!,
      };
    },
  }) as CardProduct[];
}

export { TARGET_PER_SUBCATEGORY };
