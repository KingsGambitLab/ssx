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

export interface UpcomingIntakeDetailsData {
  header: string;
  deadline: string;
  testDate: string;
  resultDate: string;
  offerReleaseDate: string;
  testId: string;
  status: string;
}

export interface UpcomingIntakeDetailsResponse {
  data: UpcomingIntakeDetailsData;
}
