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