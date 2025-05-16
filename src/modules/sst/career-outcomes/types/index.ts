export type HigherStudiesCardProps = {
  title: string;
  desc: React.ReactNode;
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

export type TrackingProps = {
  clickType?: string;
  clickText?: string;
  clickSource?: string;
  custom?: object;
};
