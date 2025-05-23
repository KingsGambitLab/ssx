import GoogleSwe from "@public/images/sst/webp/job-listings/google-swe.webp"
import GoogleFe from "@public/images/sst/webp/job-listings/google-fe.webp"
import Microsoft from "@public/images/sst/webp/job-listings/microsoft.webp"
import MasterCard from "@public/images/sst/webp/job-listings/mastercard.webp"
import Amazon from "@public/images/sst/webp/job-listings/amazon.webp"
import Oracle from "@public/images/sst/webp/job-listings/oracle.webp"
import Viacom from "@public/images/sst/webp/job-listings/viacom.webp"

type JopPostingImages = {
  src: string;
  alt: string;
  id: number;
}

type JopPosting = {
  source: string;
  jobs: JopPostingImages[]
}

export const JOB_POSTINGS: JopPosting = 

{
  source: "Source: LinkedIn",
  jobs: [
    {
      src: Amazon.src,
      alt: "amazon-job-post",
      id: 0,
    },
    {
      src: GoogleSwe.src,
      alt: "google-swe-job-post",
      id: 1,
    },
    {
      src: Microsoft.src,
      alt: "microsoft-job-post",
      id: 2,
    },
    {
      src: MasterCard.src,
      alt: "master-card-job-post",
      id: 3,
    },
    {
      src: Oracle.src,
      alt: "oracle-job-post",
      id: 4,
    },
    {
      src: Viacom.src,
      alt: "viacom-job-post",
      id: 5,
    },
    {
      src: GoogleFe.src,
      alt: "google-fe-job-post",
      id: 6,
    },
  ]
}

export const HEADER = {
  title: "Future-Proof Your Career: Skills > Degree for Tech Success",
  subtitle: (
    <p>
      Almost all tech companies only require a "Bachelor's degree in CS or equivalent" and not specifically a "BTech".
      The tech industry values practical skills over degrees. <br /> <br />Our 4 year program equips you with the in-demand technical and soft skills to excel in tech careers.
    </p>
  )
}
