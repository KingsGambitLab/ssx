export type CareerStatsCardProps = {
  title: string;
  desc: string;
  image?: string;
  variant?: "primary" | "tertiary";
  fullWidth?: boolean;
}

export type EntrepreneurshipTeamPerson = {
  key: number;
  image: string;
  name: string;
  prevOrganisation: string;
  currOrganisation: string;
}