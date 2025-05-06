export type SstVsTraditionalCardProps = {
  variant: 'red' | 'blue';
  altIcon: string;
  title: string;
  points: Array<{
    heading: string;
    subHeading: string | string[];
  }>;
  articles: Array<{
    image: string;
    alt: string;
    text?: string;
  }>;
}

export type KeyFeatureCardProps = {
  title: string;
  alt: string;
  desc: string;
  icon: string;
  featureList?: Array<{
    image: string;
    alt: string;
  }> | [];
}

export type TrackingProps = {
  clickType?: string;
  clickText?: string;
  clickSource?: string;
  custom?: object;
};
