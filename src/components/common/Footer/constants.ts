interface FooterLink {
  text: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterSocialLink {
  platform: string;
  href: string;
  ariaLabel: string;
}

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Our Offerings",
    links: [
      { text: "Scaler Academy", href: "https://www.scaler.com/academy/" },
      { text: "Scaler Data Science & ML", href: "https://www.scaler.com/data-science-course/" },
      { text: "Scaler Neovarsity", href: "https://www.scaler.com/neovarsity/v2/" }
    ]
  },
  {
    title: "Resources",
    links: [
      { text: "Topics", href: "https://www.scaler.com/topics/" },
      { text: "Events", href: "https://www.scaler.com/events" },
      { text: "Blogs", href: "https://www.scaler.com/blog/" },
      { text: "Scaler Alumni", href: "https://www.scaler.com/review/" }
    ]
  },
  {
    title: "Teach at Scaler",
    links: [
      { text: "Become a Mentor", href: "https://www.scaler.com/mentor/" },
      { text: "Become a TA", href: "https://www.scaler.com/teaching-assistant/" },
      { text: "Become a Career Coach", href: "https://www.scaler.com/mentor/" }
    ]
  },
  {
    title: "Company",
    links: [
      { text: "Blog", href: "https://www.scaler.com/blog/" },
      { text: "About us", href: "https://www.scaler.com/about/" },
      { text: "Contact us", href: "https://www.scaler.com/contact/" },
      { text: "Careers", href: "https://www.scaler.com/careers/" }
    ]
  },
  {
    title: "Other",
    links: [
      { text: "Review", href: "https://www.scaler.com/review/" },
      { text: "Teams of Use", href: "https://www.scaler.com/terms/" },
      { text: "Privacy Policy", href: "https://www.scaler.com/privacy/" }
    ]
  }
];

export const SOCIAL_LINKS: FooterSocialLink[] = [
  { platform: "YouTube", href: "https://www.youtube.com/@ScalerSchoolOfTechnology", ariaLabel: "YouTube" },
  { platform: "Instagram", href: "https://www.instagram.com/scaler_school_of_technology/", ariaLabel: "Instagram" },
  { platform: "LinkedIn", href: "https://www.scaler.com/school-of-technology/", ariaLabel: "LinkedIn" },
  { platform: "Twitter", href: "https://x.com/Scaler_SST", ariaLabel: "Twitter" }
];
