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
