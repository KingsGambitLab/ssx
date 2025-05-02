import BurstBgImage from '@public/images/common/webp/burst-bg.webp';
import NeoSapianThumbnail from '@public/images/sst/webp/neosapian-thumbnail.webp';

const CareerStatsData = {
  stats: [
    {
      title: "1.13 Lakh / Month",
      desc: "Final-year level offers in 2nd year",
      image: BurstBgImage.src,
      variant: "primary",
      fullWidth: true
    },
    {
      title: "93%",
      desc: "of eligible students have got more than one internship offered – in just their 2nd year",
      variant: "tertiary"
    },
    {
      title: "10+",
      desc: "Startups incubated at Innovation Lab, one featured on Shark Tank",
      variant: "tertiary",
      mobileOnly: true
    },
    {
      title: "100+",
      desc: "Companies registered for Campus Internships",
      variant: "primary"
    }
  ],
  video: {
    thumbnail: NeoSapianThumbnail.src
  }
}


export default CareerStatsData;