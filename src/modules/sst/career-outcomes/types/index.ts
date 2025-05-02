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