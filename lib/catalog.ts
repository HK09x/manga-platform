export type Chapter = {
  id: string;
  title: string;
  publishedAt: string;
  pages: string[];
};

export type Manga = {
  slug: string;
  title: string;
  originalTitle: string;
  cover: string;
  coverAlt: string;
  author: string;
  statusLabel: string;
  genres: string[];
  description: string;
  latestChapterLabel: string;
  updatedAt: string;
  featured?: boolean;
  chapters: Chapter[];
};

export const genres = ["ทั้งหมด", "แฟนตาซี", "ดราม่า", "ผจญภัย", "ชีวิตประจำวัน"];

export const mangaLibrary: Manga[] = [
  {
    slug: "night-of-no-stars",
    title: "คืนที่ดาวดับ",
    originalTitle: "The Night Without Stars",
    cover: "/covers/night-of-no-stars.svg",
    coverAlt: "ภาพเมืองกลางคืนใต้ดวงจันทร์สีแดง",
    author: "มินตรา วัฒนกุล",
    statusLabel: "กำลังเขียน",
    genres: ["แฟนตาซี", "ดราม่า"],
    description:
      "ในคืนที่ดวงดาวหายไปจากฟ้า ลินพบแสงประหลาดตกลงกลางเมือง และได้ยินเสียงหนึ่งเรียกชื่อเธอจากอีกฟากของความมืด",
    latestChapterLabel: "03 · แสงแรก",
    updatedAt: "อัปเดต 2 ชั่วโมงก่อน",
    featured: true,
    chapters: [
      {
        id: "night-of-no-stars-003",
        title: "ตอนที่ 3 — แสงแรก",
        publishedAt: "23 ต.ค. 2026",
        pages: [
          "/demo/night-of-no-stars-01.svg",
          "/demo/night-of-no-stars-02.svg",
          "/demo/night-of-no-stars-03.svg",
        ],
      },
      {
        id: "night-of-no-stars-002",
        title: "ตอนที่ 2 — เสียงในสายฝน",
        publishedAt: "18 ต.ค. 2026",
        pages: ["/demo/night-of-no-stars-01.svg", "/demo/night-of-no-stars-02.svg"],
      },
      {
        id: "night-of-no-stars-001",
        title: "ตอนที่ 1 — ท้องฟ้าว่างเปล่า",
        publishedAt: "11 ต.ค. 2026",
        pages: ["/demo/night-of-no-stars-01.svg", "/demo/night-of-no-stars-03.svg"],
      },
    ],
  },
  {
    slug: "map-in-my-pocket",
    title: "แผนที่ในกระเป๋า",
    originalTitle: "A Map in My Pocket",
    cover: "/covers/map-in-my-pocket.svg",
    coverAlt: "ภาพเด็กเดินทางผ่านภูเขาใต้ดวงอาทิตย์สีส้ม",
    author: "ปาริชาติ นาคะ",
    statusLabel: "จบแล้ว",
    genres: ["ผจญภัย", "ชีวิตประจำวัน"],
    description:
      "แผนที่เก่าที่ได้จากคุณตาพาเมษาออกเดินทางผ่านหมู่บ้านเล็ก ๆ เพื่อค้นหาความหมายของคำว่า ‘กลับบ้าน’",
    latestChapterLabel: "12 · บ้านของเรา",
    updatedAt: "อัปเดตเมื่อวาน",
    chapters: [
      {
        id: "map-in-my-pocket-012",
        title: "ตอนที่ 12 — บ้านของเรา",
        publishedAt: "22 ต.ค. 2026",
        pages: ["/demo/map-in-my-pocket-01.svg"],
      },
      {
        id: "map-in-my-pocket-011",
        title: "ตอนที่ 11 — ทางแยก",
        publishedAt: "15 ต.ค. 2026",
        pages: ["/demo/map-in-my-pocket-01.svg"],
      },
    ],
  },
  {
    slug: "house-number-forty-two",
    title: "บ้านเลขที่ 42",
    originalTitle: "House Number 42",
    cover: "/covers/house-number-forty-two.svg",
    coverAlt: "ภาพหน้าต่างบ้านเก่าที่มีแสงไฟอุ่นอยู่ด้านใน",
    author: "ธันวา พิชิตชัย",
    statusLabel: "กำลังเขียน",
    genres: ["ดราม่า", "ชีวิตประจำวัน"],
    description:
      "บ้านเช่าหลังเล็กกับผู้คนแปลกหน้า 4 คน ต่างคนต่างมีเรื่องที่ไม่อยากเล่า จนวันหนึ่งจดหมายที่ไม่มีชื่อผู้ส่งมาถึง",
    latestChapterLabel: "08 · จดหมายฉบับแรก",
    updatedAt: "อัปเดต 3 วันที่แล้ว",
    chapters: [
      {
        id: "house-number-forty-two-008",
        title: "ตอนที่ 8 — จดหมายฉบับแรก",
        publishedAt: "20 ต.ค. 2026",
        pages: ["/demo/house-number-forty-two-01.svg"],
      },
      {
        id: "house-number-forty-two-007",
        title: "ตอนที่ 7 — ห้องว่าง",
        publishedAt: "13 ต.ค. 2026",
        pages: ["/demo/house-number-forty-two-01.svg"],
      },
    ],
  },
  {
    slug: "paper-boat-days",
    title: "วันที่เราพับเรือกระดาษ",
    originalTitle: "Paper Boat Days",
    cover: "/covers/paper-boat-days.svg",
    coverAlt: "เรือกระดาษลอยบนแม่น้ำสีฟ้ากับดอกไม้สีแดง",
    author: "อรอุมา ตั้งใจ",
    statusLabel: "จบแล้ว",
    genres: ["ชีวิตประจำวัน", "ดราม่า"],
    description:
      "บันทึกฤดูร้อนสุดท้ายของเพื่อนสองคน ผ่านเรือกระดาษ จดหมายที่ไม่ได้ส่ง และคำสัญญาที่ค่อย ๆ เปลี่ยนไป",
    latestChapterLabel: "06 · ปลายฤดูร้อน",
    updatedAt: "อัปเดต 1 สัปดาห์ที่แล้ว",
    chapters: [
      {
        id: "paper-boat-days-006",
        title: "ตอนที่ 6 — ปลายฤดูร้อน",
        publishedAt: "16 ต.ค. 2026",
        pages: ["/demo/paper-boat-days-01.svg"],
      },
    ],
  },
];

export function findManga(slug: string) {
  return mangaLibrary.find((manga) => manga.slug === slug);
}

export function findChapter(chapterId: string) {
  for (const manga of mangaLibrary) {
    const chapterIndex = manga.chapters.findIndex((chapter) => chapter.id === chapterId);
    if (chapterIndex !== -1) {
      return {
        chapter: manga.chapters[chapterIndex],
        manga,
        chapterIndex,
      };
    }
  }

  return undefined;
}
