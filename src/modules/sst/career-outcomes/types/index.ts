export type HigherStudiesCardProps = {
  title: string;
  alt: string;
  desc: React.ReactNode;
  icon: string;
  featureList?: Array<{
    image: string;
    alt: string;
  }> | [];
}

export type CareerStatsCardProps = {
  title: string;
  desc: string;
  image?: string;
  variant?: "primary" | "tertiary";
  fullWidth?: boolean;
  mobileOnly?: boolean;
}

export type StartupCardProps = {
  key: string;
  image: string;
  name: string;
  desc: string;
  cta_text: string;
  link: string;
}

export type GuestSpeakersCardProps = {
  thumbnail: string;
  videoLink: string;
  desc: React.ReactNode;
  title?: string;
}

export type SuccessStoryCardProps = {
  isVideoCard: boolean;
  thumbnail: string;
  title: string;
  desc: string;
  videoId?: string;
  videoLink?: string;
  link?: string;
  ctaText: string;
}

export type TrackingProps = {
  clickType?: string;
  clickText?: string;
  clickSource?: string;
  custom?: object;
};
