export type CareerStatsCardProps = {
  title: string;
  desc: string;
  image?: string;
  variant?: "primary" | "tertiary";
  fullWidth?: boolean;
  mobileOnly?: boolean;
}

export type TrackingProps = {
  clickType?: string;
  clickText?: string;
  clickSource?: string;
  custom?: object;
};
