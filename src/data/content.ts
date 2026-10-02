// Content shared across pages: press, talks and the book.

// Journalism — manual list. Pre-filled from Aasif's published op-eds.
// Images and subtitles are the articles' OpenGraph cover/description,
// captured from each publication so the cards match the essay cards.
export const press: {
  title: string;
  publication: string;
  url: string;
  date?: string;
  subtitle?: string;
  image?: string;
}[] = [
  {
    title: "India’s tech education crisis: When engineers can’t code",
    publication: "The Hindu",
    url: "https://www.thehindu.com/education/indias-tech-education-crisis-when-computer-engineers-cant-code/article69243098.ece",
    date: "2025-02-20T19:33:55+05:30",
    subtitle:
      "Infosys layoffs spark debate on Indian graduates’ programming skills, and the case for a hybrid assessment framework in higher education.",
    image:
      "https://th-i.thgim.com/public/incoming/oqcs7d/article69243145.ece/alternates/LANDSCAPE_1200/iStock-1354205521.jpg",
  },
  {
    title: "CBSE’s future-ready AI curriculum, but are students ready?",
    publication: "The Hindu",
    url: "https://www.thehindu.com/education/cbses-future-ready-ai-curriculum-but-are-students-ready/article70823388.ece",
    date: "2026-04-06T08:00:00+05:30",
    subtitle:
      "New AI curriculum launches in India but overlooks essential literacy skills, risking effective learning for young students.",
    image:
      "https://th-i.thgim.com/public/education/2mmdj2/article70823593.ece/alternates/LANDSCAPE_1200/iStock-2139297549.jpg",
  },
  {
    title: "Lessons about social media usage from the idiot-box era",
    publication: "Deccan Herald",
    url: "https://www.deccanherald.com/education/lessons-about-social-media-usage-from-the-idiot-box-era-2-3958121",
    date: "2026-04-07T09:28:11+05:30",
    subtitle:
      "Short-form video's grip on children echoes an earlier era’s fears about television, and what that history suggests about balanced use.",
    image:
      "https://media.assettype.com/deccanherald%2F2026-04-07%2Fyy3ksxvx%2FiStock-1413735503.jpg?w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop",
  },
];

// Talks — public panels and webinars on AI in education. Each shows its
// YouTube thumbnail and loads the player only when clicked.
export type Talk = {
  youtubeId: string;
  title: string;
  host: string;
  date: string; // ISO
  blurb: string;
  panel: string;
};

export const talks: Talk[] = [
  {
    youtubeId: "WVr3Ggy9xSY",
    title: "Need to teach responsible use of AI",
    host: "Sixth National Conference on Education · Vidya Vanam",
    date: "2026-05-30",
    blurb:
      "A panel at the Sixth National Conference on Education, a national gathering of educators, policymakers, and researchers hosted by Vidya Vanam in Anaikatti, Coimbatore, on the theme of AI in Education. The argument: AI in the classroom has to start with responsible use, not just the tools.",
    panel:
      "With Jibu Elias (Mozilla Foundation, who leads the Responsible Computing Challenge in India; AI ethicist, ex-INDIAai) and Neerja Singh (author and speaker on generational diversity and intergenerational communication, known as “The Seenager”). Moderated by Sudarshana Srinivasan.",
  },
  {
    youtubeId: "dC6O7ysyudU",
    title: "Curriculum: How should AI be taught to children?",
    host: "The Hindu",
    date: "2026-04-11",
    blurb:
      "A webinar on what an honest AI curriculum for children should actually teach, and what it should leave out.",
    panel:
      "With Viplav Baxi (Founder, AmplifiU) and Bhanu Potta (Senior Partner, EdTech & AI, Central Square Foundation). Moderated by M. Kalyanaraman (heads education at The Hindu).",
  },
];

// The book. The rating was read off the Amazon India listing on 17 Aug 2026.
// The rating count is deliberately not shown: it moves every week and would
// go stale on the page. The score is stable enough to be worth stating.
export const book = {
  title: "Doomscroller to Reader",
  tagline: "Build a reading habit without giving up your phone.",
  amazon: "https://www.amazon.in/dp/B0GH73Z8RP",
  cover: `${import.meta.env.BASE_URL}book-cover.jpg`, // supplied by Aasif
  rating: 4.6,
};

export const endorsements = [
  {
    quote:
      "Aasif shows you how to turn the same instinct that makes you reach for your phone into a lifelong reading habit that actually sticks.",
    by: "Ankur Warikoo, Entrepreneur",
  },
  {
    quote: "Doomscroller to Reader is simple, straightforward and surprisingly hopeful.",
    by: "Meetha Raghunath, Actor",
  },
];

// A YouTube video's thumbnail, for the click-to-play talk cards.
export const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
