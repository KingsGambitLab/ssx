export type CareerStatsCardProps = {
  title: string;
  desc: string;
  image?: string;
  variant?: "primary" | "tertiary";
  fullWidth?: boolean;
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
