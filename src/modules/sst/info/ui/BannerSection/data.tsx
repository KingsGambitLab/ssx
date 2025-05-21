import Book from "@public/images/sst/svg/banner/cards/book.svg";
import Buildings from "@public/images/sst/svg/banner/cards/buildings.svg";
import UserTick from "@public/images/sst/svg/banner/cards/user-tick.svg";
import CheckList from "@public/images/sst/svg/banner/cards/check-list.svg";
import Adobe from "@public/images/sst/svg/banner/company_logos/adobe-logo.svg";
import Amazon from "@public/images/sst/svg/banner/company_logos/amazon-logo.svg";
import Google from "@public/images/sst/svg/banner/company_logos/google-logo.svg";
import Meta from "@public/images/sst/svg/banner/company_logos/meta-logo.svg";
import Microsoft from "@public/images/sst/svg/banner/company_logos/microsoft-logo.svg";

export const BANNER_CARDS = [
  {
    icon: Book.src,
    title: "CS & AI",
    desc: (
      <>
        <span>4 Years </span> Full Time Under Graduate Program",
      </>
    ),
  },
  {
    icon: Buildings.src,
    title: "Bangalore",
    desc: (
      <>
        <span>Fully Residential</span> Urban Campus in India's Silicon Valley
      </>
    ),
  },
  {
    icon: UserTick.src,
    title: "Eligibility",
    desc: (
      <>
        For current class 12 students &<span> Pass out with Mathematics</span>
      </>
    ),
  },
  {
    icon: CheckList.src,
    title: "Limited Seats",
    desc: (
      <>
        <span>In 2024 only the top 3.7% talented students</span> were
        shortlisted
      </>
    ),
  },
];

export const LOGOS = [
  {
    src: Microsoft.src,
    alt: "microsoft-logo",
  },
  {
    src: Google.src,
    alt: "google-logo",
  },
  {
    src: Amazon.src,
    alt: "amazon-logo",
  },
  {
    src: Meta.src,
    alt: "meta-logo",
  },
  {
    src: Adobe.src,
    alt: "adobe-logo",
  },
];
