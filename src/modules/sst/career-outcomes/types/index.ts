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