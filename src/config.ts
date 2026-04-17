export const SITE = {
  website: "https://jakeburleson.me/",
  author: "Jake Burleson",
  profile: "https://jakeburleson.me/",
  desc: "Data analyst portfolio — regression modeling, time series forecasting, and business intelligence.",
  title: "Jake Burleson",
  ogImage: "og-image.jpg",  // we'll replace this later
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 6,
  scheduledPostMargin: 15 * 60 * 1000,
  showArchives: true,
  showBackButton: true,
  editPost: { enabled: false },  // disable "Suggest Changes" link
  dynamicOgImage: true,
  dir: "ltr",
  lang: "en",
  timezone: "America/Chicago",  // Amarillo, TX timezone
} as const;
